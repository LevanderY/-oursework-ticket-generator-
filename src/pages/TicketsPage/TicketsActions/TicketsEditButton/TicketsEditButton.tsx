import React, { FC } from 'react'
import { EditTwoTone } from '@ant-design/icons'
import { Modal } from 'antd'
import { useVisibleModal } from '../../../../hooks/useVisibleModal'
import { TicketsListInterface } from '../../../../state/tickets/ticketsStateSlice'
import { TicketsEditForm } from '../../TicketsEditForm'

interface Props {
    id: string
    fromValues: TicketsListInterface
}

const TicketsEditButton: FC<Props> = ({ id, fromValues }: Props) => {
    const { isVisible, onOpenHandler, onCloseHandler } = useVisibleModal()

    return (
        <>
            <EditTwoTone twoToneColor='#fff' onClick={onOpenHandler} />
            <Modal onCancel={onCloseHandler} onOk={onOpenHandler} visible={isVisible} centered footer={null}>
                <TicketsEditForm id={id} fromValues={fromValues} onCloseHandler={onCloseHandler} />
            </Modal>
        </>
    )
}

export { TicketsEditButton }
