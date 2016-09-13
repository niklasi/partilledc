import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './containers/App'
import Teams from './containers/Teams'
import SignIn from './containers/SignIn'
import SeriesTable from './containers/SeriesTable'
import Matches from './containers/Matches'
import ResetPassword from './containers/ResetPassword'
import ConfirmPasswordReset from './containers/ConfirmPasswordReset'
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
               <Route path='/' component={App}>
                 <Route path='/series/:series/teams' component={Teams} />
                 <Route path='/series/:series/matches' component={Matches} />
                 <Route path='series/:series/table' component={SeriesTable} />
                 <Route path='/todays-matches' component={Matches} />
                 <Route path='/sign-in' component={SignIn} />
                 <Route path='/reset-password' component={ResetPassword} />
                 <Route path='/confirm-password-reset' component={ConfirmPasswordReset} />
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
        // unsub()
        resolve()
      },
      error => reject(error)
    )
  })
}

initAuth(store.dispatch)
  .then(() => start())
  .catch(error => console.error(error))
