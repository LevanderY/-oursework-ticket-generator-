import { all } from 'redux-saga/effects'
import testBankRootSaga from '../tests/testsSaga'

export interface ResponseGenerator {
    config?: any
    data?: any
    headers?: any
    request?: any
    status?: number
    statusText?: string
    forEach?: any
}

export default function* rootSaga() {
    yield all([testBankRootSaga()])
}
