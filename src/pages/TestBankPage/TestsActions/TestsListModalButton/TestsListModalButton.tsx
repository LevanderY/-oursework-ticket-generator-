import React, { FC } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Modal, List } from 'antd'
import { TestsBankInterface } from '../../../../state/tests/testsStateSlice'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'

interface Props {
    testBank: TestsBankInterface[]
}

const TestsListModalButton: FC<Props> = ({ testBank }: Props) => {
    const { onCloseHandler, onOpenHandler, isVisible } = useVisibleModal()
    return (
        <>
            <UnorderedListOutlined onClick={onOpenHandler} />
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <List
                    itemLayout='horizontal'
                    dataSource={testBank}
                    renderItem={({ id, test }: TestsBankInterface) => (
                        <List.Item key={id}>
                            <List.Item.Meta title={`Test`} description={test} />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    )
}

export { TestsListModalButton }
