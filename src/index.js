import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './containers/App'
import Teams from './containers/Teams'
import SeriesTable from './containers/SeriesTable'
import Matches from './containers/Matches'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'

injectTapEventPlugin()
require('./assets/index.css')

const store = configureStore()

render(<MuiThemeProvider>
         <Provider store={store}>
           <Router history={hashHistory}>
             <Route path='/' component={App}>
               <Route path='/series/:series/teams' component={Teams} />
               <Route path='/series/:series/matches' component={Matches} />
               <Route path='series/:series/table' component={SeriesTable} />
               <Route path='/todays-matches' component={Matches} />
             </Route>
           </Router>
         </Provider>
       </MuiThemeProvider>, document.getElementById('root'))
