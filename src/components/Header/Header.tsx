import React from 'react'
import { PageHeader, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ExportOutlined } from '@ant-design/icons'
import { auth } from '../../firebase'
import { logoutAuthAction } from '../../state/auth/authStateSlice'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const onLogOutHandler = async () => {
        try {
            await auth.signOut()
            dispatch(logoutAuthAction())
            history.push('/login')
            message.success('Logout successful!')
        } catch {
            message.error(`Failed to logout`)
        }
    }

    return (
        <PageHeader
            className={cx('header')}
            title={<span className={cx('title')}>Tests generator</span>}
            subTitle={<span className={cx('subtitle')}>by Yuriy Leshchyshyn</span>}
            extra={[
                <Button onClick={onLogOutHandler} key={'1'} type='primary' icon={<ExportOutlined />}>
                    Exit
                </Button>,
            ]}
        />
    )
}

export { Header }
