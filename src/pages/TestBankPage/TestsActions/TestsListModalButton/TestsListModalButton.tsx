import React, { FC } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Modal, List } from 'antd'
import { TestBankListInterface, TestsBankInterface } from '../../../../state/tests/testsStateSlice'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { TestDeleteIconButton } from '../TestDeleteIconButton'

interface Props extends TestBankListInterface {}

const TestsListModalButton: FC<Props> = ({ id, name, description, testsBank }: Props) => {
    const { onCloseHandler, onOpenHandler, isVisible } = useVisibleModal()
    const currentTestBankId: string = id

    return (
        <>
            <UnorderedListOutlined onClick={onOpenHandler} />
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <List
                    itemLayout='horizontal'
                    dataSource={testsBank}
                    renderItem={({ id, test }: TestsBankInterface) => (
                        <List.Item key={id}>
                            <List.Item.Meta title={`Test`} description={test} />
                            <TestDeleteIconButton currentTestId={id} formValues={{ id: currentTestBankId, name, description, testsBank }} />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    )
}

export { TestsListModalButton }
