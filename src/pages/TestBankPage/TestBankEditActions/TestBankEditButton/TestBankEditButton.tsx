import React, { FC } from 'react'
import { EditOutlined } from '@ant-design/icons'

interface Props {
    id: string
}

const TestBankEditButton: FC<Props> = ({ id }: Props) => {
    return <EditOutlined key='edit' />
}

export { TestBankEditButton }
