import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TestsBankInterface {
    test: string
}

export interface TestBankListInterface {
    id: string
    name: string
    description: string
    testsBank: TestsBankInterface[]
}

export interface StateTestsInterface {
    isTestBankLoading: boolean
    isHaveFirstLoading: boolean
    testBankList: TestBankListInterface[]
}

const initialState: StateTestsInterface = {
    isTestBankLoading: true,
    isHaveFirstLoading: false,
    testBankList: [],
}

const testsState = createSlice({
    name: 'tests',
    initialState: initialState,
    reducers: {
        loadingListTestsAction(state) {
            state.isTestBankLoading = true
        },
        loadingListTestsSuccess(state, { payload: { testBankList } }: PayloadAction<{ testBankList: TestBankListInterface[] }>) {
            state.testBankList = testBankList
            state.isTestBankLoading = false
            state.isHaveFirstLoading = true
        },
    },
})

export const { loadingListTestsAction, loadingListTestsSuccess } = testsState.actions
export default testsState.reducer
