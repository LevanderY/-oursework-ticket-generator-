import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StateAuthInterface {
    isLogin: boolean
}

const initialState: StateAuthInterface = {
    isLogin: false,
}

const authState = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginAuthAction(state, { payload: { idToken } }: PayloadAction<{ idToken: string | undefined }>) {
            state.isLogin = true
            localStorage.setItem('token', idToken ? idToken : '')
        },
        logoutAuthAction(state) {
            state.isLogin = false
            localStorage.removeItem('token')
        },
    },
})

export const { loginAuthAction, logoutAuthAction } = authState.actions

export default authState.reducer
