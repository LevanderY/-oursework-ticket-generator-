import React, { FC, useEffect } from 'react'
import { Row, Col, Card, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingSpin } from '../../components'
import { TicketsDeleteButton, TicketsEditButton, TicketsModalButton } from './TicketsActions'
import { TicketsPdfRedirect } from './TicketsPdfRedirect'
import { loadingTicketsListAction, TicketsListInterface } from '../../state/tickets/ticketsStateSlice'
import { AppStateInterface } from '../../state/_store/createRootReducer'

const { Meta } = Card

const TicketsPage: FC = () => {
    const dispatch = useDispatch()
    const { ticketsList, isTicketsListLoading, isHaveFirstLoading } = useSelector((state: AppStateInterface) => state.tickets)

    useEffect(() => {
        dispatch(loadingTicketsListAction())
    }, [dispatch])

    return (
        <div className={'container'}>
            <TicketsModalButton />
            {<LoadingSpin isLoading={isTicketsListLoading} top={150} isHaveFirstLoading={isHaveFirstLoading} />}
            {isHaveFirstLoading && (
                <Row>
                    {ticketsList.map(({ id, title, author, questionsBank }: TicketsListInterface) => (
                        <Col span={5} key={id} style={{ margin: 10 }}>
                            <Card
                                title={title}
                                style={{ marginTop: 16 }}
                                loading={isTicketsListLoading}
                                extra={<TicketsPdfRedirect id={id} title={title} author={author} questionsBank={questionsBank} />}
                                actions={[
                                    <TicketsDeleteButton key={'ticketDelete'} id={id} />,
                                    <TicketsEditButton id={id} fromValues={{ id, title, author, questionsBank }} />,
                                ]}
                                key={id}
                            >
                                <Row gutter={[8, 16]}>
                                    <Col span={12}>
                                        <Meta description={<Tag color='#23232e'>Author :</Tag>} />
                                    </Col>
                                    <Col span={12}>
                                        <Meta description={author} />
                                    </Col>
                                    <Col span={12}>
                                        <Meta description={<Tag color='#23232e'>Variants :</Tag>} />
                                    </Col>
                                    <Col span={12}>
                                        <Meta description={questionsBank.length} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    )
}

export { TicketsPage }
