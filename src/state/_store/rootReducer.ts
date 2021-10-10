import { combineReducers } from 'redux'
import auth, { StateAuthInterface } from '../auth/authStateSlice'

export interface AppStateInterface {
    auth: StateAuthInterface
}

export const rootReducer = combineReducers({
    auth,
})
