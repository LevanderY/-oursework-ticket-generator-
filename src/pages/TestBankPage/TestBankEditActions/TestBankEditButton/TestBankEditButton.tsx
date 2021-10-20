import React, { FC } from 'react'
import { Modal } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { TestBankForm, TestBanKFormValuesInterface } from '../../TestBankForm'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'

interface Props {
    id: string
    formValues: TestBanKFormValuesInterface
}

const TestBankEditButton: FC<Props> = ({ id, formValues }: Props) => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <>
            <EditOutlined onClick={onOpenHandler} />
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TestBankForm id={id} title={'Edit test bank'} onCloseHandler={onCloseHandler} formValues={formValues} />
            </Modal>
        </>
    )
}

export { TestBankEditButton }
