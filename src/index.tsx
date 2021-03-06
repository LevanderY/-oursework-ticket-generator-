import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { Root } from './components'
import { BrowserRouter as Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, history } from './state/_store/configurateStore'
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore()

ReactDOM.render(
    <React.StrictMode>
        <Route>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Root />
                </ConnectedRouter>
            </Provider>
        </Route>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
