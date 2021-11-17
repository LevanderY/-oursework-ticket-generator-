import React, { FC } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import NestedTableIcon from '../../../components/NestedTableIcon/NestedTableIcon'
import { TicketsFilter } from '../TicketsActions'
import { AppStateInterface } from '../../../state/_store/createRootReducer'
import { TestBankListInterface } from '../../../state/tests/testsStateSlice'

const { Column } = Table

interface Props {
    onCloseHandler: () => void
}

const TestsBankTable: FC<Props> = ({ onCloseHandler }: Props) => {
    const { testBankList, isTestBankLoading } = useSelector((state: AppStateInterface) => state.tests)

    return (
        <div>
            <Table
                style={{ marginTop: '30px' }}
                dataSource={testBankList}
                size='middle'
                pagination={false}
                loading={isTestBankLoading}
                rowKey={({ id }: TestBankListInterface) => id}
                expandable={{
                    expandedRowRender: ({ testsBank }: TestBankListInterface) => <TicketsFilter onCloseHandler={onCloseHandler} testsBank={testsBank} />,
                    expandIcon: ({ expanded, onExpand, record }) => (
                        <NestedTableIcon title={'Create'} expanded={expanded} onExpand={onExpand} record={record} />
                    ),
                }}
            >
                <Column title={'Назва банку'} dataIndex={'name'} key={'name'} />
                <Column title={'Опис банку'} dataIndex={'description'} key={'description'} />
            </Table>
        </div>
    )
}

export { TestsBankTable }
