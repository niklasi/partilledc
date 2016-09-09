import { combineReducers } from 'redux'

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

const seriesTable = (state, action) => {
  state = state || []
  switch (action.type) {
    case 'LOAD_SERIES_TABLE_SUCCESS':
      return action.payload.sort((a, b) => a.teamp - b.teamp)
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
      console.log('match changed', action.payload)
      return state
    case 'UNLOAD_MATCHES':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({series, teams, seriesTable, matches})
