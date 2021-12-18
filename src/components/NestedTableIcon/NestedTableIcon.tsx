import React from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface Props<T> {
    title: string
    expanded: boolean
    onExpand: (record: T, e: React.MouseEvent<HTMLSpanElement>) => void
    record: T
}

const NestedTableIcon = <T,>({ expanded, onExpand, record }: Props<T>): JSX.Element => (
    <>
        {expanded ? (
            <DownOutlined onClick={(e: React.MouseEvent<HTMLSpanElement>) => onExpand(record, e)} />
        ) : (
            <UpOutlined onClick={(e: React.MouseEvent<HTMLSpanElement>) => onExpand(record, e)} />
        )}
    </>
)

export default NestedTableIcon
