import { put, takeLatest, all, call } from 'redux-saga/effects'
import { loadingListTestsAction, loadingListTestsSuccess, TestBankListInterface } from './testsStateSlice'
import { auth, rsf } from '../../firebase'
import { ResponseGenerator } from '../_store/rootSaga'

interface FirestoreItemSnapshotInterface {
    data: Function
    id: string
}

function* loadingListBankTestSaga() {
    try {
        const mainCollection: ResponseGenerator = yield call(rsf.firestore.getCollection, 'root')
        const lessCollection: ResponseGenerator = yield call(rsf.firestore.getCollection, `root/${auth.currentUser?.uid}/test-banks`)

        const tests: TestBankListInterface[] = []

        mainCollection.forEach((test: FirestoreItemSnapshotInterface) => {
            if (test.id === auth.currentUser?.uid) {
                lessCollection.forEach((item: FirestoreItemSnapshotInterface) => {
                    const data = item.data() as TestBankListInterface
                    data.id = item.id as string
                    tests.push(data)
                })
            }
        })

        yield put(loadingListTestsSuccess({ testBankList: tests }))
    } catch (e) {
        console.log(e)
    }
}

export default function* testBankRootSaga() {
    yield all([takeLatest(loadingListTestsAction.type, loadingListBankTestSaga)])
}
