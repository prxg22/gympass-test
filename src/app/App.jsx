import React from 'react'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'

import { Container } from './ui-components/Grid'
import { Home, Repos } from './pages'
import { reducer } from './reducers'

import style from './App.styl'

const history = createHistory({ basename: '/' })


const composedEhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const configureStore = () => createStore(
    connectRouter(history)(reducer),
    { error: '', isLoading: false },
    composedEhancers(applyMiddleware(thunk, routerMiddleware(history))),
)

const store = configureStore()

const App = () => (
    <Container className={style.app} fluid>
        <div className={style.app__title}>
            <h1 className={style.home__title}>githubstars</h1>
        </div>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/repos/:username" component={Repos} />
                    <Route path="*" component={Home} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    </Container>
)

export default App
