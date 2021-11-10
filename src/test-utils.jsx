import React from 'react'
import {render} from '@testing-library/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './store'

injectTapEventPlugin()
const store = configureStore()

const AllTheProviders = ({children}) => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
          {children}
      </Provider>
    </MuiThemeProvider>
  )
}

export const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
// export {customRender as render}
