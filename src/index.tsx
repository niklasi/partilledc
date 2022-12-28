import {createRoot} from 'react-dom/client'
import {createRoutesFromElements, createBrowserRouter, Route, RouterProvider} from 'react-router-dom'
import App from './components/App'
import * as Teams from './routes/series/Teams'
import * as SeriesTable from './routes/series/Table'
import * as AllSeriesTable from './routes/AllSeriesTables'
import * as Matches from './routes/series/Matches'
import * as TodaysMatches from './routes/TodaysMatches'
import * as MyMatches from './routes/MyMatches'
import * as Reset from './components/Reset'
import * as User from './routes/User'
import * as Admin from './routes/Admin'
import * as AdminTeams from './routes/Admin/Teams/index'
import * as AdminMatches from './routes/Admin/Matches'
import {AuthProvider} from './components/AuthProvider'
import {SeriesProvider} from './components/SeriesProvider'
import '@fontsource/roboto'
import './assets/index.css'

const root = createRoot(document.getElementById('root'))

const routes = createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route
            path="/series/company/table"
            loader={async (props) => AllSeriesTable.loader({seriesType: 'CompanySeries', ...props})}
            element={<AllSeriesTable.default />}
        />
        <Route
            path="/series/exercise/table"
            loader={async (props) => AllSeriesTable.loader({seriesType: 'ExerciseSeries', ...props})}
            element={<AllSeriesTable.default />}
        />
        <Route path="/series/:series">
            <Route path="teams" handle={{title: 'Lag'}} loader={Teams.loader} element={<Teams.default />} />
            <Route
                path="matches"
                handle={{title: 'Matcher'}}
                loader={Matches.loader}
                element={<Matches.default />}
            />
            <Route
                path="table"
                handle={{title: 'Tabell'}}
                loader={SeriesTable.loader}
                element={<SeriesTable.default />}
            />
            <Route
                path="reset"
                handle={{title: 'Nollställ'}}
                loader={Reset.loader}
                element={<Reset.default />}
            />
        </Route>
        <Route
            path="/todays-matches"
            handle={{title: 'Dagens matcher'}}
            loader={TodaysMatches.loader}
            element={<TodaysMatches.default />}
        />
        <Route
            path="/my-matches"
            handle={{title: 'Mina matcher'}}
            loader={MyMatches.loader}
            element={<MyMatches.default />}
        />
        <Route
            path="/sign-in"
            handle={{title: 'Logga in'}}
            action={User.SignIn.action}
            element={<User.SignIn.default />}
        />
        <Route
            path="/register-user"
            handle={{title: 'Ny användare'}}
            action={User.RegisterUser.action}
            element={<User.RegisterUser.default />}
        />
        <Route
            path="/reset-password"
            handle={{title: 'Återställ lösenord'}}
            action={User.ResetPassword.action}
            element={<User.ResetPassword.default />}
        />
        <Route
            path="/confirm-password-reset"
            handle={{title: 'Bekräfta'}}
            action={User.ConfirmPasswordReset.action}
            element={<User.ConfirmPasswordReset.default />}
        />
        <Route path="/admin">
            <Route index handle={{title: 'Admin'}} loader={Admin.loader} element={<Admin.default />} />
            <Route path=":series/teams">
                <Route 
                    index 
                    handle={{title:'Admin - Lag'}} 
                    loader={AdminTeams.List.loader} 
                    element={<AdminTeams.List.default />} 
                />
                <Route 
                    path=":teamId" 
                    handle={{title:'Admin - Lag'}} 
                    loader={AdminTeams.Edit.loader} 
                    action={AdminTeams.Edit.action} 
                    element={<AdminTeams.Edit.default />} 
                />
            </Route>
            <Route path=":series/matches" handle={{title: 'Admin - Matcher'}} loader={AdminMatches.loader} element={<AdminMatches.Matches />} />
        </Route>
    </Route>
)

const router = createBrowserRouter(routes)

root.render(
    <SeriesProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </SeriesProvider>
)
