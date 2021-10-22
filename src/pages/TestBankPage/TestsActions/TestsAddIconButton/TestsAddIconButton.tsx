import React, { FC } from 'react'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Popover } from 'antd'
import { TestBankListInterface } from '../../../../state/tests/testsStateSlice'
import { TestsForm } from '../../TestsForm/TestsForm'

interface Props extends TestBankListInterface {}

const TestsAddIconButton: FC<Props> = ({ id, name, description, testsBank }: Props) => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <>
            <Popover title={'Add test!'} trigger='hover'>
                <PlusOutlined onClick={onOpenHandler} />
            </Popover>
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TestsForm onCloseHandler={onCloseHandler} title={'Create test'} formValues={{ id, name, description, testsBank }} />
            </Modal>
        </>
    )
}

export { TestsAddIconButton }
