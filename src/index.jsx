import ReactDOM from 'react-dom/client'
import { DataBrowserRouter, Routes, Route } from 'react-router-dom'
import App from './components/App'
import Teams, {loader as teamsLoader} from './routes/series/Teams'
import SeriesTable, {loader as tableLoader} from './routes/series/Table'
import AllSeriesTable, {loader as allTablesLoader} from './routes/AllSeriesTables'
import Matches from './routes/series/Matches'
import TodaysMatches from './routes/TodaysMatches'
import MyMatches from './routes/MyMatches'
import Reset from './components/Reset'
import { SignIn, ResetPassword, ConfirmPasswordReset, RegisterUser } from './routes/user'
import { action as signInAction } from './routes/User/SignIn'
import { action as resetPasswordAction } from './routes/User/ResetPassword'
import { action as confirmResetPasswordAction } from './routes/User/ConfirmPasswordReset'
import { action as registerUserAction } from './routes/User/RegisterUser'
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
    <DataBrowserRouter>
        <Route path='/' element={<App />}>
          <Route path='/series/company/table' loader={async (props) => allTablesLoader({seriesType:'companySeries', ...props})} element={<AllSeriesTable name='Lagtabeller' />} />
          <Route path='/series/exercise/table' loader={async (props) => allTablesLoader({seriesType:'exerciseSeries', ...props})} element={<AllSeriesTable name='Motionstabeller' />} />
          <Route path='/series/:series'>
            <Route path='teams' loader={teamsLoader} element={<Teams name='Lag' />} />
            <Route path='matches' element={<Matches name='Matcher' />} />
            <Route path='table' loader={tableLoader} element={<SeriesTable name='Tabell' />} />
            <Route path='reset' element={<Reset name='Nollställ' />} />
          </Route>
          <Route path='/todays-matches' element={<TodaysMatches name='Dagens matcher' />} />
          <Route path='/my-matches' element={<MyMatches name='Mina matcher' />} />
          <Route path='/sign-in' action={signInAction} element={<SignIn name='Logga in ' />} />
          <Route path='/register-user' action={registerUserAction} element={<RegisterUser name='Ny användare' />} />
          <Route path='/reset-password' action={resetPasswordAction} element={<ResetPassword name='Återställ lösenord' />} />
          <Route path='/confirm-password-reset' action={confirmResetPasswordAction} element={<ConfirmPasswordReset name='Bekräfta' />} />
        </Route>
    </DataBrowserRouter>
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
