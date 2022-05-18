import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './components/App'
import Teams from './components/Teams/Teams'
import SeriesTable from './components/Series/SeriesTable'
import AllSeriesTable from './components/Series/AllSeries'
import Matches from './components/Matches/Matches'
import Reset from './components/Reset'
import { SignIn, ResetPassword, ConfirmPasswordReset, RegisterUser } from './components/Users'
import { Provider } from 'react-redux'
import configureStore from './store'
import { firebaseAuth } from './firebase'
import { currentUser } from './actions'
import '@fontsource/roboto'
import './assets/index.css'

const store = configureStore()
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

const start = () => {
root.render(<Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/series/company/table' element={<AllSeriesTable name='Lagtabeller' seriesType='companySeries' />} />
          <Route path='/series/company/table' element={<AllSeriesTable name='Motionstabeller' seriesType='exerciseSeries' />} />
          <Route path='/series/:series/teams' element={<Teams name='Lag' />} />
          <Route path='/series/:series/matches' onEnter={(nextState) => { nextState.location.state = { tag: 'series' } }} element={<Matches name='Matcher' />} />
          <Route path='series/:series/table' element={<SeriesTable name='Tabell' />} />
          <Route path='series/:series/reset' element={<Reset name='Nollställ' />} />
          <Route path='/todays-matches' onEnter={(nextState) => { nextState.location.state = { tag: 'today' } }} element={<Matches name='Dagens matcher' />} />
          <Route path='/my-matches' onEnter={(nextState) => { nextState.location.state = { tag: 'my' } }} element={<Matches name='Mina matcher' />} />
          <Route path='/sign-in' element={<SignIn name='Logga in ' />} />
          <Route path='/register-user' element={<RegisterUser name='Ny användare' />} />
          <Route path='/reset-password' element={<ResetPassword name='Återställ lösenord' />} />
          <Route path='/confirm-password-reset' element={<ConfirmPasswordReset name='Bekräfta' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>)
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
