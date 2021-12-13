import React from 'react'
import ReactDOM from 'react-dom'
import reducers from './redux/reducers'
import App from './component/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import 'semantic-ui-css/semantic.min.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    { auth: { authenticated: localStorage.getItem('token') } },
    composeEnhancers(applyMiddleware(reduxThunk))
)


ReactDOM.render(
    <Provider
        store={store}>
        <App />
    </Provider>
    , document.querySelector('#root'))