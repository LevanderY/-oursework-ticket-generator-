import { put, takeLatest, all, call } from 'redux-saga/effects'
import { loadingListTestsAction, loadingListTestsSuccess, TestBankListInterface } from './testsStateSlice'
import { rsf } from '../../firebase'
import { ResponseGenerator } from '../_store/rootSaga'

interface FirestoreItemSnapshotInterface {
    data: Function
    id: string
}

function* loadingListBankTestSaga() {
    try {
        const snapshot: ResponseGenerator = yield call(rsf.firestore.getCollection, 'test-banks')
        let tests: TestBankListInterface[] = []
        snapshot.forEach((test: FirestoreItemSnapshotInterface) => {
            const data = test.data() as TestBankListInterface
            data.id = test.id as string
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
