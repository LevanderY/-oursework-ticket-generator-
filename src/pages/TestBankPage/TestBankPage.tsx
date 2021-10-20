import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { loadingListTestsAction } from '../../state/tests/testsStateSlice'
import { AppStateInterface } from '../../state/_store/createRootReducer'
const { Column } = Table

const TestBankPage: React.FC = () => {
    const dispatch = useDispatch()
    const { testBankList, isTestBankLoading } = useSelector((state: AppStateInterface) => state.tests)

    useEffect(() => {
        dispatch(loadingListTestsAction())
    }, [dispatch])

    useEffect(() => {
        console.log(testBankList)
    }, [testBankList])

    //const foo = async () => {
    // update
    // await firestore.collection('test-bank3').doc(`V55tjAQwEpVKK8u7S3Tj`).set({
    //     name: 'ddd',
    // })
    //delete
    // await firestore.collection('test-bank3').doc('V55tjAQwEpVKK8u7S3Tj').delete()
    // }

    return (
        <div>
            {/*<TestBankAddButton />*/}
            {/*<Table dataSource={testBankList} loading={isTestBankLoading} key={'1'}>*/}
            {/*    <Column title={'name'} dataIndex={'name'} />*/}
            {/*    <Column title={'desctiption'} dataIndex={'desctiption'} />*/}
            {/*</Table>*/}
        </div>
    )
}

export { TestBankPage }
