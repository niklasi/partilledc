import { combineReducers } from 'redux'
import { matchPoints, teamPoints } from '../lib/partilledc-score'

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

const seriesTable = (state, action) => {
  state = state || []
  switch (action.type) {
    case 'LOAD_SERIES_TABLE_SUCCESS':
      // teamName, teamId, series, matches, teamp, matchp, teamRanking
      const flatten = (list, item) => [].concat.apply(list, item)
      let map = new Map()
      const proto = Object.assign(Object.getPrototypeOf(map), {
        valuesToArray: function () {
          return Array.from(this.values())
        }
      })
      Object.setPrototypeOf(map, proto)

      return action.payload
        .map(m => {
          const matchp = matchPoints(m.matches.map(i => i.result))
          const teamp = teamPoints(matchp)

          let homeTeam = mapTeamToTableSeries(m.homeTeam)
          homeTeam.series = m.series
          homeTeam.matches = 0
          homeTeam.matchp = {won: matchp.home, lost: matchp.away}
          homeTeam.teamp = teamp.home

          let awayTeam = mapTeamToTableSeries(m.awayTeam)
          awayTeam.series = m.series
          awayTeam.matches = 0
          awayTeam.matchp = {won: matchp.away, lost: matchp.home}
          awayTeam.teamp = teamp.away

          return [homeTeam, awayTeam]
        })
        .reduce(flatten)
        .reduce((map, team) => {
          let existingTeam = map.get(team.id)
          if (existingTeam) {
            existingTeam.matchp.won += team.matchp.won
            existingTeam.matchp.lost += team.matchp.lost
            existingTeam.teamp += team.teamp
          }

          let updatedTeam = existingTeam || team
          if (team.matchp.won > 0 || team.matchp.lost > 0) updatedTeam.matches += 1
          map.set(team.id, updatedTeam)
          return map
        }, map)
        .valuesToArray()
        .sort((t1, t2) => {
          const teamp = t2.teamp - t1.teamp
          if (teamp !== 0) return teamp

          const matchp = (t2.matchp.won - t2.matchp.lost) - (t1.matchp.won - t1.matchp.lost)
          if (matchp !== 0) return matchp

          const matches = t1.matches - t2.matches
          if (matches !== 0) return matches

          return t2.teamRanking - t1.teamRanking
        })

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
