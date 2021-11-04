import { put, takeLatest, all, call } from 'redux-saga/effects'
import { loadingTicketsListAction, loadingTicketsListSuccessAction, TicketsListInterface } from './ticketsStateSlice'
import { auth, rsf } from '../../firebase'
import { ResponseGenerator } from '../_store/rootSaga'

interface FirestoreItemSnapshotInterface {
    data: Function
    id: string
}

function* loadingTicketsListSaga() {
    try {
        const mainCollection: ResponseGenerator = yield call(rsf.firestore.getCollection, 'root')
        const lessCollection: ResponseGenerator = yield call(rsf.firestore.getCollection, `root/${auth.currentUser?.uid}/tickets`)

        const tickets: TicketsListInterface[] = []

        mainCollection.forEach((ticket: FirestoreItemSnapshotInterface) => {
            if (ticket.id === auth.currentUser?.uid) {
                lessCollection.forEach((item: FirestoreItemSnapshotInterface) => {
                    const data = item.data() as TicketsListInterface
                    data.id = item.id as string
                    tickets.push(data)
                })
            }
        })

        yield put(loadingTicketsListSuccessAction({ ticketsList: tickets }))
    } catch (e) {
        console.log(e)
    }
}

export default function* ticketsListRootSaga() {
    yield all([takeLatest(loadingTicketsListAction.type, loadingTicketsListSaga)])
}
