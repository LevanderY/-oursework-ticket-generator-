import React, { FC, useEffect, useCallback, useState } from 'react'
import { Table } from 'antd'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserHistory } from 'history'
import { LoadingSpin } from '../../components'
import { TestsActions, TestsAddIconButton } from '../TestBankPage'
import { AppStateInterface } from '../../state/_store/createRootReducer'
import { loadingListTestsAction, TestBankListInterface, TestsBankInterface } from '../../state/tests/testsStateSlice'

const { Column } = Table

interface TestListLocationInterface extends TestBankListInterface {}

const TestsListPage: FC = () => {
    const dispatch = useDispatch()
    const history = createBrowserHistory()
    const location = useLocation<TestListLocationInterface>()
    const { isTestBankLoading, isHaveFirstLoading, testBankList } = useSelector((state: AppStateInterface) => state.tests)

    const [locationState, setLocationState] = useState<TestListLocationInterface>(location.state)
    const { testsBank, id, name, description } = locationState

    const updateHistory = useCallback(() => {
        // Getting new data from state
        const newLocationState = testBankList.find(({ id }: TestBankListInterface) => id === location.state.id)
        // Replacing new data with old in location state
        history.replace({ ...location, state: { ...newLocationState } })
        // Setting new data from location state
        setLocationState(history.location.state as TestBankListInterface)
    }, [history, location, testBankList])

    useEffect(() => {
        dispatch(loadingListTestsAction())
    }, [dispatch])

    useEffect(() => {
        updateHistory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testBankList])

    return (
        <div className={'container'}>
            {<LoadingSpin isLoading={isTestBankLoading} top={150} isHaveFirstLoading={isHaveFirstLoading} />}
            {isHaveFirstLoading && (
                <>
                    <TestsAddIconButton formValues={{ testsBank, id, name, description }} />
                    <Table style={{ marginTop: '16px' }} dataSource={testsBank} size='small' pagination={false} loading={isTestBankLoading}>
                        <Column title={'Назва'} dataIndex={'test'} key={'testTitle'} />
                        <Column
                            title={'Дії'}
                            key={'Actions'}
                            render={(item: TestsBankInterface) => (
                                <TestsActions key={name} currentTestBankId={item.id} formValues={{ testsBank, id, name, description }} />
                            )}
                        />
                    </Table>
                </>
            )}
        </div>
    )
}

export { TestsListPage }
