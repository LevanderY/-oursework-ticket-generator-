import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TestsBankInterface } from '../tests/testsStateSlice'

export interface QuestionsBankInterface {
    variant: string
    testBank: TestsBankInterface[]
}

export interface TicketsListInterface {
    id: string
    title: string
    author: string
    questionsBank: QuestionsBankInterface[]
}

export interface StateTicketsInterface {
    isHaveFirstLoading: boolean
    isTicketsListLoading: boolean
    ticketsList: TicketsListInterface[]
}

const initialState: StateTicketsInterface = {
    isHaveFirstLoading: false,
    isTicketsListLoading: false,
    ticketsList: [],
}

const ticketsState = createSlice({
    name: 'tickets',
    initialState: initialState,
    reducers: {
        loadingTicketsListAction(state) {
            state.isTicketsListLoading = true
        },
        loadingTicketsListSuccessAction(state, { payload: { ticketsList } }: PayloadAction<{ ticketsList: TicketsListInterface[] }>) {
            state.ticketsList = ticketsList
            state.isTicketsListLoading = false
            state.isHaveFirstLoading = true
        },
    },
})

export const { loadingTicketsListAction, loadingTicketsListSuccessAction } = ticketsState.actions
export default ticketsState.reducer
