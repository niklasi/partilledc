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
            <Route path='teams' handle={{title: 'Lag'}} loader={teamsLoader} element={<Teams />} />
            <Route path='matches'handle={{title: 'Matcher'}} element={<Matches />} />
            <Route path='table' handle={{title: 'Tabell'}} loader={tableLoader} element={<SeriesTable />} />
            <Route path='reset' handle={{title: 'Nollställ'}} element={<Reset />} />
          </Route>
          <Route path='/todays-matches'handle={{title: 'Dagens matcher'}} element={<TodaysMatches />} />
          <Route path='/my-matches' handle={{title: 'Mina matcher'}}element={<MyMatches />} />
          <Route path='/sign-in' handle={{title: 'Logga in'}}action={signInAction} element={<SignIn />} />
          <Route path='/register-user' handle={{title: 'Ny användare'}}action={registerUserAction} element={<RegisterUser />} />
          <Route path='/reset-password' handle={{title: 'Återställ lösenord'}}action={resetPasswordAction} element={<ResetPassword />} />
          <Route path='/confirm-password-reset' handle={{title: 'Bekräfta'}} action={confirmResetPasswordAction} element={<ConfirmPasswordReset />} />
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
