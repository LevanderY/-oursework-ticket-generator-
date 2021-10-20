import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import LoadingSpin from '../../components/spins/LoadingSpin'
import { loadingListTestsAction, TestBankListInterface } from '../../state/tests/testsStateSlice'
import { AppStateInterface } from '../../state/_store/createRootReducer'
import { TestBankAddButton, TestBankDeleteButton } from './TestBankEditActions'

const { Meta } = Card

const TestBankPage: React.FC = () => {
    const dispatch = useDispatch()
    const { testBankList, isTestBankLoading, isHaveFirstLoading } = useSelector((state: AppStateInterface) => state.tests)

    useEffect(() => {
        dispatch(loadingListTestsAction())
    }, [dispatch])

    //const foo = async () => {
    // update
    // await firestore.collection('test-bank3').doc(`V55tjAQwEpVKK8u7S3Tj`).set({
    //     name: 'ddd',
    // })

    return (
        <>
            <TestBankAddButton />
            {<LoadingSpin isLoading={isTestBankLoading} top={150} isHaveFirstLoading={isHaveFirstLoading} />}
            {isHaveFirstLoading && (
                <Row>
                    {testBankList.map(({ id, description, name, testsBank }: TestBankListInterface) => (
                        <Col span={6} key={id} style={{ margin: 16 }}>
                            <Card
                                actions={[<EditOutlined key='edit' />, <TestBankDeleteButton key={'delete'} id={id} />, <EllipsisOutlined key='ellipsis' />]}
                                style={{ width: 300, margin: 16, padding: 15 }}
                                loading={isTestBankLoading}
                            >
                                <Meta title={name} description={description} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export { TestBankPage }
