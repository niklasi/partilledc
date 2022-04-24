import firebase from 'firebase/app'
import 'firebase/functions'
import { FirebaseList, firebaseAuth } from '../firebase'

const functionUrl = firebase.functions().emulatorOrigin ? firebase.functions().emulatorOrigin + '/project-8539870983476533695/' + firebase.functions().region : 'https://us-central1-project-8539870983476533695.cloudfunctions.net'
const seriesList = new FirebaseList({ onLoad: loadSeriesSuccess }, (attr) => Object.assign({}, attr))

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

const teamsList = new FirebaseList({ onLoad: loadTeamsSuccess }, (attr) => Object.assign({}, attr))

export function loadTeamsSuccess (teams) {
  return {
    type: 'LOAD_TEAMS_SUCCESS',
    payload: teams
  }
}

export function loadTeams (seriesId) {
  return (dispatch) => {
    teamsList.path = '/teams'
    teamsList.subscribe(dispatch, { child: 'series', equalTo: seriesId })
  }
}

export function unloadTeams () {
  teamsList.unsubscribe()
  return {
    type: 'UNLOAD_TEAMS',
    payload: []
  }
}

const seriesTableList = new FirebaseList({ onLoad: loadSeriesTableSuccess }, (attr) => Object.assign({}, attr))

export function loadSeriesTableSuccess (seriesTable) {
  return {
    type: 'LOAD_SERIES_TABLE_SUCCESS',
    payload: seriesTable
  }
}

export function loadSeriesTable (seriesId) {
  return (dispatch) => {
    seriesTableList.path = '/matches'
    seriesTableList.subscribe(dispatch, { child: 'series', equalTo: seriesId })
  }
}

export function unloadSeriesTable () {
  seriesTableList.unsubscribe()
  return {
    type: 'UNLOAD_SERIES_TABLE',
    payload: {}
  }
}

const matchList = new FirebaseList({ onLoad: loadMatchesSuccess, onChange: matchChanged }, (attr) => Object.assign({}, attr))

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
    matchList.unsubscribe()
    matchList.subscribe(dispatch, { child: 'series', equalTo: seriesId })
  }
}

export function loadTodaysMatches (today) {
  return (dispatch) => {
    matchList.path = '/matches'
    matchList.subscribe(dispatch, { child: 'date', equalTo: today })
  }
}

export function loadMyMatches (uid) {
  return (dispatch) => {
    fetch(`${functionUrl}/mymatches?uid=${uid}`)
      .then(response => response.json())
      .then(data => {
        return dispatch(loadMatchesSuccess(data))
      })
      .catch(console.log)
  }
}

export function saveMatch (match) {
  return (dispatch) => {
    matchList.path = '/matches'
    matchList.set(match.id, match).catch((err) => {
      console.error(err)
    })
  }
}

export function unloadMatches () {
  matchList.unsubscribe()
  return {
    type: 'UNLOAD_MATCHES',
    payload: []
  }
}

export function signIn (email, password) {
  return (dispatch) => {
    firebaseAuth.signInWithEmailAndPassword(email, password).catch(function (error) {
      console.log('Error signing in: ' + error.message)
    })
  }
}

export function registerUser (email, password) {
  return (dispatch) => {
    firebaseAuth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      console.log('Error signing in: ' + error.message)
    })
  }
}

export function resetPassword (email) {
  return (dispatch) => {
    firebaseAuth.sendPasswordResetEmail(email).then(() => {
      console.log('reset', email)
    }).catch(function (error) {
      console.log('Error resetting password: ' + error.message)
    })
  }
}

export function confirmPasswordReset (code, newPassword) {
  return (dispatch) => {
    firebaseAuth.confirmPasswordReset(code, newPassword).then(() => {
      console.log('confirm')
    }).catch(function (error) {
      console.log('Error confirming password reset: ' + error.message)
    })
  }
}

export function currentUser (user) {
  return {
    type: 'AUTH_STATE_CHANGE',
    payload: user
  }
}

export function signOut () {
  return (dispatch) => {
    firebaseAuth.signOut().catch(function (error) {
      console.log('Error signing out: ' + error.message)
    })
  }
}

export function loadScrapedSeriesSuccess (scrapedData) {
  return {
    type: 'LOAD_SCRAPED_SERIES_SUCCESS',
    payload: scrapedData
  }
}

export function loadResetSeriesSuccess () {
  return {
    type: 'LOAD_RESET_SERIES_SUCCESS'
  }
}

export function loadScrapedSeries (slug) {
  return (dispatch) => {
    fetch(`/scraper/${slug}`)
      .then(response => response.json())
      .then(data => {
        return dispatch(loadScrapedSeriesSuccess(data))
      })
      .catch(console.log)
  }
}

export function resetSeries (seriesId, slug, uid) {
  return (dispatch) => {
    fetch(`${functionUrl}/resetSeries?seriesId=${seriesId}&slug=${slug}&uid=${uid}`)
      .then(response => response.json())
      .then(data => {
        return dispatch(loadResetSeriesSuccess())
      })
      .catch(console.log)
  }
}
