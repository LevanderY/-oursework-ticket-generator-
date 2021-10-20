import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import auth, { StateAuthInterface } from '../auth/authStateSlice'
import tests, { StateTestsInterface } from '../tests/testsStateSlice'

export interface AppStateInterface {
    auth: StateAuthInterface
    tests: StateTestsInterface
}

export const createRootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        auth,
        tests,
    })
