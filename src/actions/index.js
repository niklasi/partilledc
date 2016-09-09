import { FirebaseList } from '../firebase'

const seriesList = new FirebaseList({onLoad: loadSeriesSuccess}, (attr) => Object.assign({}, attr))

export function loadSeriesSuccess (series) {
  return {
    type: 'LOAD_SERIES_SUCCESS',
    payload: series
  }
}

export function loadSeries () {
  return (dispatch) => {
    seriesList.path = '/series'
    seriesList.subscribe(dispatch)
  }
}

export function unloadSeries () {
  seriesList.unsubscribe()
  return {
    type: 'UNLOAD_SERIES'
  }
}

const teamsList = new FirebaseList({onLoad: loadTeamsSuccess}, (attr) => Object.assign({}, attr))

export function loadTeamsSuccess (teams) {
  return {
    type: 'LOAD_TEAMS_SUCCESS',
    payload: teams
  }
}

export function loadTeams (seriesId) {
  return (dispatch) => {
    teamsList.path = '/teams'
    teamsList.subscribe(dispatch, {child: 'series', equalTo: seriesId})
  }
}

export function unloadTeams () {
  teamsList.unsubscribe()
  return {
    type: 'UNLOAD_TEAMS',
    payload: []
  }
}

const seriesTableList = new FirebaseList({onLoad: loadSeriesTableSuccess}, (attr) => Object.assign({}, attr))

export function loadSeriesTableSuccess (seriesTable) {
  return {
    type: 'LOAD_SERIES_TABLE_SUCCESS',
    payload: seriesTable
  }
}

export function loadSeriesTable (seriesId) {
  return (dispatch) => {
    seriesTableList.path = '/matches'
    seriesTableList.subscribe(dispatch, {child: 'series', equalTo: seriesId})
  }
}

export function unloadSeriesTable () {
  seriesTableList.unsubscribe()
  return {
    type: 'UNLOAD_SERIES_TABLE',
    payload: []
  }
}

const matchList = new FirebaseList({onLoad: loadMatchesSuccess, onChange: matchChanged}, (attr) => Object.assign({}, attr))

export function loadMatchesSuccess (matches) {
  return {
    type: 'LOAD_MATCHES_SUCCESS',
    payload: matches
  }
}

export function matchChanged (match) {
  return {
    type: 'MATCH_CHANGED',
    payload: match
  }
}

export function loadMatches (seriesId) {
  return (dispatch) => {
    matchList.path = '/matches'
    matchList.subscribe(dispatch, {child: 'series', equalTo: seriesId})
  }
}

export function loadTodaysMatches (today) {
  return (dispatch) => {
    matchList.path = '/matches'
    matchList.subscribe(dispatch, {child: 'date', equalTo: today})
  }
}

export function saveMatch (match) {
  return (dispatch) => {
    matchList.path = '/matches'
    matchList.set(match.id, match)
  }
}

export function unloadMatches () {
  matchList.unsubscribe()
  return {
    type: 'UNLOAD_MATCHES',
    payload: []
  }
}
