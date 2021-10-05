import React from 'react'
import { PageHeader, Button } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

const Header: React.FC = () => (
    <PageHeader
        className={cx('header')}
        title={<span className={cx('title')}>Tests generator</span>}
        subTitle={<span className={cx('subtitle')}>by Yuriy Leshchyshyn</span>}
        extra={[
            <Button key={'1'} type='primary' icon={<ExportOutlined />}>
                Exit
            </Button>,
        ]}
    />
)

export { Header }
