import React, { FC } from 'react'
import { TicketsListInterface } from '../../../state/tickets/ticketsStateSlice'
import { Link } from 'react-router-dom'
import { FilePdfTwoTone } from '@ant-design/icons'

interface Props extends TicketsListInterface {}

const TicketsPdfRedirect: FC<Props> = ({ id, title, questionsBank, author }: Props) => {
    return (
        <Link
            to={{
                pathname: `/ticket-pdf/${title}/${id[0]}`,
                state: {
                    id: id,
                    title: title,
                    author: author,
                    questionsBank: questionsBank,
                },
            }}
        >
            <FilePdfTwoTone twoToneColor={'#fff'} />
        </Link>
    )
}

export { TicketsPdfRedirect }
