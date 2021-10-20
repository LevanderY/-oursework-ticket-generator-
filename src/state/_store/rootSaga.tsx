import { all } from 'redux-saga/effects'
import testBankRootSaga from '../tests/testsSaga'

export default function* rootSaga() {
    yield all([testBankRootSaga()])
}
