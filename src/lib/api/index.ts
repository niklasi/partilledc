import {firebaseDb, functionUrl} from '../../firebase'
import {ref, orderByChild, equalTo, query, get, set, push, DataSnapshot} from 'firebase/database'
import * as allSeries from '../../series.json'
import {matchPoints, teamPoints} from '../partilledc-score'
import type * as model from '../model'

export async function getAllSeries(): Promise<model.Series[]> {
    const companySeries = allSeries.companySeries.map((s) => ({...s, type: 'CompanySeries'}))
    const exerciseSeries = allSeries.exerciseSeries.map((s) => ({...s, type: 'ExerciseSeries'}))

    return [...companySeries, ...exerciseSeries] as model.Series[]
}

export async function getTeamsBySeries(series: string): Promise<model.Team[]> {
    const teamsRef = ref(firebaseDb, 'teams')

    const snapshot = await get(query(teamsRef, orderByChild('series'), equalTo(series)))

    return unwrap<model.Team>(snapshot).sort((a, b) => a.teamRanking - b.teamRanking)
}

export async function getMatchesBySeries(series: string): Promise<model.Match[]> {
    const matchesRef = ref(firebaseDb, 'matches')
    const snapshot = await get(query(matchesRef, orderByChild('series'), equalTo(series)))

    return unwrap<model.Match>(snapshot).sort((a, b) => {
        if (a.date === b.date) return +a.time - +b.time
        return a.date > b.date ? 1 : -1
    })
}

export async function getMatchesByUser(userId: string): Promise<model.Match[]> {
    const response = await fetch(`${functionUrl}/mymatches?uid=${userId}`)
    return response.json()
}

export async function getMatchesByDate(date: string): Promise<model.Match[]> {
    const matchesRef = ref(firebaseDb, 'matches')
    const snapshot = await get(query(matchesRef, orderByChild('date'), equalTo(date)))
    const matches = unwrap<model.Match>(snapshot) || []

    return matches.sort((a, b) => {
        if (a.date === b.date) return +a.time - +b.time
        return a.date > b.date ? 1 : -1
    })
}

export async function saveMatch(match: model.Match): Promise<void> {
    const matchRef = ref(firebaseDb, `matches/${match.id}`)
    await set(matchRef, match)
}

export async function saveTeam(team: model.Team): Promise<void> {
    const teamRef = ref(firebaseDb, `teams/${team.id}`)
    
    await set(teamRef, team)
}

export async function createTeam(team: model.Team): Promise<void> {
    const teamsRef = ref(firebaseDb, 'teams')
    
    await push(teamsRef, team)
}

export async function getScrapedSeries(slug: string) {
    const response = await fetch(`/scraper/${slug}`)
    return response.json()
}

export async function resetSeries(seriesId: string, slug: string, userId: string) {
    await fetch(`${functionUrl}/resetSeries?seriesId=${seriesId}&slug=${slug}&uid=${userId}`)
}

export async function getTableBySeries(series: string): Promise<model.SeriesTableItem[]> {
    const matches = await getMatchesBySeries(series)

    return makeSeriesTable(matches)
}

async function makeSeriesTable(matches: model.Match[]): Promise<model.SeriesTableItem[]> {
    const map: {valuesToArray: () => model.SeriesTableItem[]} = Object.create({
        valuesToArray: function () {
            const tmp = []
            Object.keys(this).forEach((k) => tmp.push(this[k]))
            return tmp
        },
    })

    const allSeries = await getAllSeries()
    const ranking =
        allSeries.find((s) => s.id === matches[0].series)?.type === 'CompanySeries'
            ? companySeriesRanking
            : exerciseSeriesRanking

    return matches
        .map((match) => {
            const matchp = matchPoints(match.matches)
            const teamp = teamPoints(matchp)
            const homeTeam: model.SeriesTableItem = {
                ...mapTeamToTableSeries(match.homeTeam),
                matchp: {won: {...matchp.home}, lost: {...matchp.away}},
                teamp: teamp.home,
            }

            const awayTeam: model.SeriesTableItem = {
                ...mapTeamToTableSeries(match.awayTeam),
                matchp: {won: {...matchp.away}, lost: {...matchp.home}},
                teamp: teamp.away,
            }

            return [homeTeam, awayTeam]
        })
        .flatMap((x) => x)
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
}

function mapTeamToTableSeries({id, teamName, teamRanking}) {
    return {id, teamName, teamRanking, matches: 0, teamp: 0}
}

function companySeriesRanking(t1: model.SeriesTableItem, t2: model.SeriesTableItem) {
    const teamp = t2.teamp - t1.teamp
    if (teamp !== 0) return teamp

    const matchp = t2.matchp.won.points - t2.matchp.lost.points - (t1.matchp.won.points - t1.matchp.lost.points)
    if (matchp !== 0) return matchp

    const matches = t1.matches - t2.matches
    if (matches !== 0) return matches

    return t2.teamRanking - t1.teamRanking
}

function exerciseSeriesRanking(t1: model.SeriesTableItem, t2: model.SeriesTableItem) {
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

function unwrap<T>(snapshot: DataSnapshot): Array<T> {
    if (!snapshot.exists()) return
    const items = snapshot.val() as T

    return Object.entries(items).map(([key, value]) => ({id: key, ...value}))
}
