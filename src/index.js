import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/App'
import Teams from './components/Teams/Teams'
import SeriesTable from './components/Series/SeriesTable'
import Matches from './components/Matches/Matches'
import { SignIn, ResetPassword, ConfirmPasswordReset, RegisterUser } from './components/Users'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'
import { firebaseAuth } from './firebase'
import { currentUser } from './actions'

injectTapEventPlugin()
require('./assets/index.css')

const store = configureStore()

const start = () => {
  render(<MuiThemeProvider>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' name='' component={App}>
          <Route path='/series/:series/teams' name='Lag' component={Teams} />
          <Route path='/series/:series/matches' name='Matcher' onEnter={(nextState) => { nextState.location.state = {tag: 'series'} }} component={Matches} />
          <Route path='series/:series/table' name='Tabell' component={SeriesTable} />
          <Route path='/todays-matches' name='Dagens matcher' onEnter={(nextState) => { nextState.location.state = {tag: 'today'} }} component={Matches} />
          <Route path='/my-matches' name='Mina matcher' onEnter={(nextState) => { nextState.location.state = {tag: 'my'} }} component={Matches} />
          <Route path='/sign-in' name='Logga in' component={SignIn} />
          <Route path='/register-user' name='Ny användare' component={RegisterUser} />
          <Route path='/reset-password' name='Återställ lösenord' component={ResetPassword} />
          <Route path='/confirm-password-reset' name='Bekräfta' component={ConfirmPasswordReset} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>, document.getElementById('root'))
}

const initAuth = (dispatch) => {
  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged(
      user => {
        dispatch(currentUser(user))
        resolve()
      },
      error => reject(error)
    )
  })
}

initAuth(store.dispatch)
  .then(() => start())
  .catch(error => console.error(error))
