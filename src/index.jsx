import { render } from 'react-dom'
import App from './components/App'
import Teams from './components/Teams/Teams'
import SeriesTable from './components/Series/SeriesTable'
import AllSeriesTable from './components/Series/AllSeries'
import Matches from './components/Matches/Matches'
import Reset from './components/Reset'
import { SignIn, ResetPassword, ConfirmPasswordReset, RegisterUser } from './components/Users'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'
import { firebaseAuth } from './firebase'
import { currentUser } from './actions'
import '@fontsource/roboto'
import './assets/index.css'

const store = configureStore()

const start = () => {
  render(
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' name='' component={App}>
            <Route path='/series/company/table' name='Lagtabeller' seriesType='companySeries' component={AllSeriesTable} />
            <Route path='/series/exercise/table' name='Motionstabeller' seriesType='exerciseSeries' component={AllSeriesTable} />
            <Route path='/series/:series/teams' name='Lag' component={Teams} />
            <Route path='/series/:series/matches' name='Matcher' onEnter={(nextState) => { nextState.location.state = { tag: 'series' } }} component={Matches} />
            <Route path='series/:series/table' name='Tabell' component={SeriesTable} />
            <Route path='series/:series/reset' name='Nollställ' component={Reset} />
            <Route path='/todays-matches' name='Dagens matcher' onEnter={(nextState) => { nextState.location.state = { tag: 'today' } }} component={Matches} />
            <Route path='/my-matches' name='Mina matcher' onEnter={(nextState) => { nextState.location.state = { tag: 'my' } }} component={Matches} />
            <Route path='/sign-in' name='Logga in' component={SignIn} />
            <Route path='/register-user' name='Ny användare' component={RegisterUser} />
            <Route path='/reset-password' name='Återställ lösenord' component={ResetPassword} />
            <Route path='/confirm-password-reset' name='Bekräfta' component={ConfirmPasswordReset} />
          </Route>
        </Router>
      </Provider>, document.getElementById('root'))
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
