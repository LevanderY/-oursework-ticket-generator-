import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { message, Popover } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import { auth, firestore } from '../../../../firebase'
import { loadingTicketsListAction } from '../../../../state/tickets/ticketsStateSlice'

interface Props {
    id: string
}

const TicketsDeleteButton: FC<Props> = ({ id }: Props) => {
    const dispatch = useDispatch()

    const onDeleteTicketHandler = async () => {
        try {
            await firestore.collection('root').doc(auth.currentUser?.uid).collection('tickets').doc(id).delete()
            dispatch(loadingTicketsListAction())
            message.success('Test bank has been deleted!')
        } catch (e: any | unknown) {
            message.error(e)
        }
    }

    return (
        <Popover title={'Delete ticket?'} trigger='hover'>
            <DeleteTwoTone twoToneColor={'#fff'} onClick={onDeleteTicketHandler} />
        </Popover>
    )
}

export { TicketsDeleteButton }
