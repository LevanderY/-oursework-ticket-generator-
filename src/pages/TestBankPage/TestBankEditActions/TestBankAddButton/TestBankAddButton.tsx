import React from 'react'
import { Button, Modal } from 'antd'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { TestBankForm } from '../../TestBankForm'

const TestBankAddButton: React.FC = () => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <>
            <Button ghost onClick={onOpenHandler}>
                Create test bank
            </Button>
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TestBankForm title={'Create test bank'} onCloseHandler={onCloseHandler} />
            </Modal>
        </>
    )
}

export { TestBankAddButton }
