import React from 'react'
import { PageHeader, Button } from 'antd'
import { ExportOutlined } from '@ant-design/icons'

import s from './Header.module.scss'

const Header: React.FC = () => {
    return (
        <>
            <PageHeader
                className={s.header}
                title={<span className={s.title}>Tests generator</span>}
                subTitle={<span className={s.subtitle}>by Yuriy Leshchyshyn</span>}
                extra={[
                    <Button type='primary' icon={<ExportOutlined />}>
                        Exit
                    </Button>,
                ]}
            />
        </>
    )
}

export { Header }
