import React, { FC } from 'react'
import { Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import { TestBankForm } from '../../TestBankForm'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { TestBankListInterface } from '../../../../state/tests/testsStateSlice'

interface Props {
    id: string
    formValues: TestBankListInterface
}

const TestBankEditButton: FC<Props> = ({ id, formValues }: Props) => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <>
            <EditTwoTone twoToneColor='#fff' onClick={onOpenHandler} />
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TestBankForm id={id} title={'Редагувати банк'} onCloseHandler={onCloseHandler} formValues={formValues} />
            </Modal>
        </>
    )
}

export { TestBankEditButton }
