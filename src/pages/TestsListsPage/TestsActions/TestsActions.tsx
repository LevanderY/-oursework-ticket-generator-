import React, { FC } from 'react'
import { Row, Col, Space } from 'antd'
import { TestsDeleteIconButton } from './TestsDeleteIconButton'
import { TestsEditIconButton } from './TestsEditIconButton'
import { TestBankListInterface } from '../../../state/tests/testsStateSlice'

export interface TestActionsPropsInterface {
    currentTestBankId: string
    formValues: TestBankListInterface
}

interface Props extends TestActionsPropsInterface {}

const TestsActions: FC<Props> = ({ currentTestBankId, formValues }: Props) => {
    return (
        <Row justify='end'>
            <Space size={'large'}>
                <Col span={3}>
                    <TestsEditIconButton currentTestBankId={currentTestBankId} formValues={formValues} />
                </Col>
                <Col span={3}>
                    <TestsDeleteIconButton currentTestId={currentTestBankId} formValues={formValues} />
                </Col>
            </Space>
        </Row>
    )
}

export { TestsActions }
