import React, { FC, useEffect, useCallback, useState } from 'react'
import { Table } from 'antd'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { createBrowserHistory } from 'history'
import { LoadingSpin } from '../../components'
import { TestsActions, TestsAddIconButton } from '../TestBankPage'
import { AppStateInterface } from '../../state/_store/createRootReducer'
import { TestBankListInterface, TestsBankInterface } from '../../state/tests/testsStateSlice'

const { Column } = Table

interface TestListLocationInterface extends TestBankListInterface {}

const TestsListPage: FC = () => {
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
        updateHistory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testBankList])

    return (
        <>
            {<LoadingSpin isLoading={isTestBankLoading} top={150} isHaveFirstLoading={isHaveFirstLoading} />}
            {isHaveFirstLoading && (
                <>
                    <TestsAddIconButton formValues={{ testsBank, id, name, description }} />
                    <Table key={id} dataSource={testsBank} size='small' pagination={false} loading={isTestBankLoading}>
                        <Column title={'Test title'} dataIndex={'test'} key={'testTitle'} />
                        <Column
                            title={'Actions'}
                            key={'Actions'}
                            render={(item: TestsBankInterface) => (
                                <TestsActions key={name} currentTestBankId={item.id} formValues={{ testsBank, id, name, description }} />
                            )}
                        />
                    </Table>
                </>
            )}
        </>
    )
}

export { TestsListPage }
