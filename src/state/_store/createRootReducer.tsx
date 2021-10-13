import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import auth, { StateAuthInterface } from '../auth/authStateSlice'

export interface AppStateInterface {
    auth: StateAuthInterface
}

export const createRootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        auth,
    })
