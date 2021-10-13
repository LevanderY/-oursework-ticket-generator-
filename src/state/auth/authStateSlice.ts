import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StateAuthInterface {
    idToken: string | undefined
    isLogin: boolean
}

const initialState: StateAuthInterface = {
    idToken: undefined,
    isLogin: false,
}

const authState = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginAuthAction(state, { payload: { idToken } }: PayloadAction<{ idToken: string | undefined }>) {
            state.isLogin = true
            state.idToken = idToken
        },
        logoutAuthAction(state) {
            state.isLogin = false
            state.idToken = undefined
        },
    },
})

export const { loginAuthAction, logoutAuthAction } = authState.actions

export default authState.reducer
