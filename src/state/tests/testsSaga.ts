import { put, takeLatest, all, call } from 'redux-saga/effects'
import { loadingListTestsAction, loadingListTestsSuccess, TestBankListInterface } from './testsStateSlice'
import { rsf } from '../../firebase'

interface ResponseGenerator {
    config?: any
    data?: any
    headers?: any
    request?: any
    status?: number
    statusText?: string
    forEach?: any
}

function* loadingListBankTestSaga() {
    try {
        const snapshot: ResponseGenerator = yield call(rsf.firestore.getCollection, 'test-bank3')
        let tests: TestBankListInterface[] = []
        snapshot.forEach((test: any) => {
            const data = test.data()
            data.id = test.id
            tests.push(data)
        })
        yield put(loadingListTestsSuccess({ testBankList: tests }))
    } catch (e) {
        console.log(e)
    }
}

export default function* testBankRootSaga() {
    yield all([takeLatest(loadingListTestsAction.type, loadingListBankTestSaga)])
}
