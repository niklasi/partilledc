import { combineReducers } from 'redux'
import { matchPoints, teamPoints } from '../lib/partilledc-score'
import allSeries from '../series.json'

const series = (state, action) => {
  state = state || []
  switch (action.type) {
    case 'LOAD_SERIES_SUCCESS':
      return action.payload.sort((a, b) => a.order - b.order)
    case 'UNLOAD_SERIES':
      return action.payload
    default:
      return state
  }
}

const teams = (state, action) => {
  state = state || []
  switch (action.type) {
    case 'LOAD_TEAMS_SUCCESS':
      return action.payload.sort((a, b) => a.teamRanking - b.teamRanking)
    case 'UNLOAD_TEAMS':
      return action.payload
    default:
      return state
  }
}

const mapTeamToTableSeries = ({id, teamName, teamRanking}) => {
  return {id, teamName, teamRanking}
}

const companySeriesRanking = (t1, t2) => {
  const teamp = t2.teamp - t1.teamp
  if (teamp !== 0) return teamp

  const matchp = (t2.matchp.won.points - t2.matchp.lost.points) - (t1.matchp.won.points - t1.matchp.lost.points)
  if (matchp !== 0) return matchp

  const matches = t1.matches - t2.matches
  if (matches !== 0) return matches

  return t2.teamRanking - t1.teamRanking
}

const exerciseSeriesRanking = (t1, t2) => {
  const teamp = t2.teamp - t1.teamp
  if (teamp !== 0) return teamp

  const setsp = (t2.matchp.won.sets - t2.matchp.lost.sets) - (t1.matchp.won.sets - t1.matchp.lost.sets)
  if (setsp !== 0) return setsp

  const gamesp = (t2.matchp.won.games - t2.matchp.lost.games) - (t1.matchp.won.games - t1.matchp.lost.games)
  if (gamesp !== 0) return gamesp

  const matches = t1.matches - t2.matches
  if (matches !== 0) return matches

  return t2.teamRanking - t1.teamRanking
}

const seriesTable = (state, action) => {
  state = state || []
  switch (action.type) {
    case 'LOAD_SERIES_TABLE_SUCCESS':
      // teamName, teamId, series, matches, teamp, matchp, teamRanking
      const flatten = (list, item) => [].concat.apply(list, item)
      const map = Object.create({
        valuesToArray: function () {
          const tmp = []
          Object.keys(this).forEach(k => tmp.push(this[k]))
          return tmp
        }
      })

      const ranking = allSeries.companySeries
        .filter(s => {
          const series = action.payload.length > 0 ? action.payload[0].series : ''
          return s.id === series
        }).length > 0
        ? companySeriesRanking
        : exerciseSeriesRanking

      return action.payload
        .map(m => {
          const matchp = matchPoints(m.matches.map(i => i.result))
          const teamp = teamPoints(matchp)
          let homeTeam = mapTeamToTableSeries(m.homeTeam)
          homeTeam.series = m.series
          homeTeam.matches = 0
          homeTeam.matchp = {won: Object.assign({}, matchp.home), lost: Object.assign({}, matchp.away)}
          homeTeam.teamp = teamp.home
          let awayTeam = mapTeamToTableSeries(m.awayTeam)
          awayTeam.series = m.series
          awayTeam.matches = 0
          awayTeam.matchp = {won: Object.assign({}, matchp.away), lost: Object.assign({}, matchp.home)}
          awayTeam.teamp = teamp.away

          return [homeTeam, awayTeam]
        })
        .reduce(flatten)
        .reduce((map, team) => {
          let existingTeam = map[team.id]
          if (existingTeam) {
            existingTeam.matchp.won.points += team.matchp.won.points
            existingTeam.matchp.won.sets += team.matchp.won.sets
            existingTeam.matchp.won.games += team.matchp.won.games
            existingTeam.matchp.lost.points += team.matchp.lost.points
            existingTeam.matchp.lost.sets += team.matchp.lost.sets
            existingTeam.matchp.lost.games += team.matchp.lost.games
            existingTeam.teamp += team.teamp
          }

          let updatedTeam = existingTeam || team
          if (team.matchp.won.points > 0 || team.matchp.lost.points > 0) updatedTeam.matches += 1
          map[team.id] = updatedTeam
          return map
        }, map)
        .valuesToArray()
        .sort(ranking)

    case 'UNLOAD_SERIES_TABLE':
      return action.payload
    default:
      return state
  }
}

const matches = (state, action) => {
  state = state || []
  switch (action.type) {
    case 'LOAD_MATCHES_SUCCESS':
      return action.payload.sort((a, b) => {
        if (a.date === b.date) return +a.time - +b.time
        return a.date > b.date ? 1 : -1
      })

    case 'MATCH_CHANGED':
      return state
    case 'UNLOAD_MATCHES':
      return action.payload
    default:
      return state
  }
}

const user = (state, action) => {
  state = state || {isAnonymous: true}
  switch (action.type) {
    case 'AUTH_STATE_CHANGE':
      if (!action.payload) return {isAnonymous: true}
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default combineReducers({series, teams, seriesTable, matches, user})
