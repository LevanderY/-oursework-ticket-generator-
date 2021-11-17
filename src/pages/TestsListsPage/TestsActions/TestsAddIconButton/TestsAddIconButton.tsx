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
        <div className={'top'}>
            <Button ghost onClick={onOpenHandler}>
                Create test
            </Button>
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TestsForm title={'Create test'} onCloseHandler={onCloseHandler} formValues={formValues} />
            </Modal>
        </div>
    )
}

export { TestsAddIconButton }
