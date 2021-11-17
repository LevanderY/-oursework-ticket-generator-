import React, { FC } from 'react'
import { Modal, Button } from 'antd'
import { BankTwoTone } from '@ant-design/icons'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { TestsBankTable } from '../../TestsBankTable'

const TicketsModalButton: FC = () => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <div className={'top'}>
            <Button ghost onClick={onOpenHandler}>
                Створити білет <BankTwoTone twoToneColor={'#fff'} />
            </Button>

            <Modal visible={isVisible} onCancel={onCloseHandler} width={1000} centered mask footer={null}>
                <TestsBankTable onCloseHandler={onCloseHandler} />
            </Modal>
        </div>
    )
}

export { TicketsModalButton }
