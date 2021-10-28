import React, { FC } from 'react'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { Button, Modal } from 'antd'
import { TestsForm } from '../../TestsForm/TestsForm'
import { TestBankListInterface } from '../../../../state/tests/testsStateSlice'

interface Props {
    formValues: TestBankListInterface
}

const TestsAddIconButton: FC<Props> = ({ formValues }: Props) => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <>
            <Button ghost onClick={onOpenHandler}>
                Create test bank
            </Button>
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TestsForm title={'Create test'} onCloseHandler={onCloseHandler} formValues={formValues} />
            </Modal>
        </>
    )
}

export { TestsAddIconButton }
