import firebase from 'firebase/app'
import {firebaseDb} from '../../firebase'
import * as allSeries from '../../series.json'
import {matchPoints, teamPoints} from '../partilledc-score'

const functionUrl = firebase.functions().emulatorOrigin
    ? firebase.functions().emulatorOrigin + '/project-8539870983476533695/' + firebase.functions().region
    : 'https://us-central1-project-8539870983476533695.cloudfunctions.net'

export async function getTeamsBySeries(series) {
    const ref = firebaseDb.ref('teams').orderByChild('series').equalTo(series)

    const snapshot = await promisify(ref)

    return unwrap(snapshot).sort((a, b) => a.order - b.order)
}

export async function getMatchesBySeries(series) {
    const ref = firebaseDb.ref('matches').orderByChild('series').equalTo(series)

    const snapshot = await promisify(ref)

    return unwrap(snapshot).sort((a, b) => {
        if (a.date === b.date) return +a.time - +b.time
        return a.date > b.date ? 1 : -1
    })
}

export async function getMatchesByUser(userId: string) {
    const response = await fetch(`${functionUrl}/mymatches?uid=${userId}`)
    return response.json()
}

export async function getMatchesByDate(date: string) {
    const ref = firebaseDb.ref('matches').orderByChild('date').equalTo(date)

    const snapshot = await promisify(ref)
    const matches = unwrap(snapshot) || []

    return matches.sort((a, b) => {
        if (a.date === b.date) return +a.time - +b.time
        return a.date > b.date ? 1 : -1
    })
}

export async function saveMatch(match) {
    const ref = firebaseDb.ref(`matches/${match.id}`)
    return new Promise((resolve, reject) => {
        ref.set(match)
            .then((data) => {
                return resolve(data)
            })
            .catch(reject)
    })
}

export async function getScrapedSeries(slug) {
    const response = await fetch(`/scraper/${slug}`)
    return response.json()
}

export async function getTableBySeries(series) {
    const ref = firebaseDb.ref('matches').orderByChild('series').equalTo(series)

    const snapshot = await promisify(ref)

    return sortSeriesTable(unwrap(snapshot))
}

function sortSeriesTable(matches) {
    const flatten = (list, item) => [].concat.apply(list, item)
    const map = Object.create({
        valuesToArray: function () {
            const tmp = []
            Object.keys(this).forEach((k) => tmp.push(this[k]))
            return tmp
        },
    })

    let series = ''
    const state = {}
    const ranking =
        allSeries.companySeries.filter((s) => {
            series = matches.length > 0 ? matches[0].series : ''
            return s.id === series
        }).length > 0
            ? companySeriesRanking
            : exerciseSeriesRanking

    state[series] = matches
        .map((m) => {
            const matchp = matchPoints(m.matches.map((i) => i.result))
            const teamp = teamPoints(matchp)
            const homeTeam = mapTeamToTableSeries(m.homeTeam)
            homeTeam.series = m.series
            homeTeam.matches = 0
            homeTeam.matchp = {won: Object.assign({}, matchp.home), lost: Object.assign({}, matchp.away)}
            homeTeam.teamp = teamp.home
            const awayTeam = mapTeamToTableSeries(m.awayTeam)
            awayTeam.series = m.series
            awayTeam.matches = 0
            awayTeam.matchp = {won: Object.assign({}, matchp.away), lost: Object.assign({}, matchp.home)}
            awayTeam.teamp = teamp.away

            return [homeTeam, awayTeam]
        })
        .reduce(flatten, [])
        .reduce((map, team) => {
            const existingTeam = map[team.id]
            if (existingTeam) {
                existingTeam.matchp.won.points += team.matchp.won.points
                existingTeam.matchp.won.sets += team.matchp.won.sets
                existingTeam.matchp.won.games += team.matchp.won.games
                existingTeam.matchp.lost.points += team.matchp.lost.points
                existingTeam.matchp.lost.sets += team.matchp.lost.sets
                existingTeam.matchp.lost.games += team.matchp.lost.games
                existingTeam.teamp += team.teamp
            }

            const updatedTeam = existingTeam || team
            if (team.matchp.won.points > 0 || team.matchp.lost.points > 0) updatedTeam.matches += 1
            map[team.id] = updatedTeam
            return map
        }, map)
        .valuesToArray()
        .sort(ranking)

    return Object.assign({}, state)
}

function mapTeamToTableSeries({id, teamName, teamRanking}) {
    return {id, teamName, teamRanking}
}
function companySeriesRanking(t1, t2) {
    const teamp = t2.teamp - t1.teamp
    if (teamp !== 0) return teamp

    const matchp = t2.matchp.won.points - t2.matchp.lost.points - (t1.matchp.won.points - t1.matchp.lost.points)
    if (matchp !== 0) return matchp

    const matches = t1.matches - t2.matches
    if (matches !== 0) return matches

    return t2.teamRanking - t1.teamRanking
}

function exerciseSeriesRanking(t1, t2) {
    const teamp = t2.teamp - t1.teamp
    if (teamp !== 0) return teamp

    const setsp = t2.matchp.won.sets - t2.matchp.lost.sets - (t1.matchp.won.sets - t1.matchp.lost.sets)
    if (setsp !== 0) return setsp

    const gamesp = t2.matchp.won.games - t2.matchp.lost.games - (t1.matchp.won.games - t1.matchp.lost.games)
    if (gamesp !== 0) return gamesp

    const matches = t1.matches - t2.matches
    if (matches !== 0) return matches

    return t2.teamRanking - t1.teamRanking
}
function promisify(ref) {
    return new Promise((resolve, reject) => {
        ref.get()
            .then((snapshot) => {
                return resolve(snapshot)
            })
            .catch(reject)
    })
}

function unwrap(snapshot) {
    if (!snapshot.exists()) return
    const items = snapshot.val()

    return Object.entries(items).map(([key, value]) => Object.assign({id: key}, value))
}
