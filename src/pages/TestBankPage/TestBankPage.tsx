import React, { useEffect } from 'react'
import { Row, Col, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingSpin } from '../../components'
import { TestsListRedirectLink } from './TestsListRedirectLink'
import { TestBankAddButton, TestBankDeleteButton, TestBankEditButton } from './TestBankEditActions'
import { loadingListTestsAction, TestBankListInterface } from '../../state/tests/testsStateSlice'
import { AppStateInterface } from '../../state/_store/createRootReducer'

const { Meta } = Card

const TestBankPage: React.FC = () => {
    const dispatch = useDispatch()
    const { testBankList, isTestBankLoading, isHaveFirstLoading } = useSelector((state: AppStateInterface) => state.tests)

    useEffect(() => {
        dispatch(loadingListTestsAction())
    }, [dispatch])

    return (
        <>
            <TestBankAddButton />
            {<LoadingSpin isLoading={isTestBankLoading} top={150} isHaveFirstLoading={isHaveFirstLoading} />}
            {isHaveFirstLoading && (
                <Row>
                    {testBankList.map(({ id, description, name, testsBank }: TestBankListInterface) => (
                        <Col span={5} key={id} style={{ margin: 10 }}>
                            <Card
                                actions={[
                                    <TestBankEditButton key={'edit'} id={id} formValues={{ id, name, description, testsBank }} />,
                                    <TestBankDeleteButton key={'delete'} id={id} />,
                                    <TestsListRedirectLink key={'redirectLink'} id={id} name={name} description={description} testsBank={testsBank} />,
                                ]}
                                // extra={<TestsAddIconButton key={'add-test'} id={id} name={name} description={description} testsBank={testsBank} />}
                                title={name}
                                style={{ marginTop: 16 }}
                                loading={isTestBankLoading}
                                key={id}
                            >
                                <Meta description={description} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export { TestBankPage }
