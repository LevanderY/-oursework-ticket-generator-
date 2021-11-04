import React from 'react'
import { Tooltip } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface Props<T> {
    title: string
    expanded: boolean
    onExpand: (record: T, e: React.MouseEvent<HTMLSpanElement>) => void
    record: T
}

const NestedTableIcon = <T,>({ expanded, onExpand, record, title }: Props<T>): JSX.Element => (
    <>
        {expanded ? (
            <DownOutlined onClick={(e: React.MouseEvent<HTMLSpanElement>) => onExpand(record, e)} />
        ) : (
            <UpOutlined onClick={(e: React.MouseEvent<HTMLSpanElement>) => onExpand(record, e)} />
        )}
    </>
)

export default NestedTableIcon
