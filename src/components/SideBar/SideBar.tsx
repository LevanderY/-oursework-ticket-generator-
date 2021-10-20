import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { BankOutlined, BookOutlined } from '@ant-design/icons'

const SideBar: React.FC = () => {
    return (
        <Menu style={{ height: '100vh' }} defaultSelectedKeys={['1']} mode={'vertical'} theme={'dark'}>
            <Menu.Item key='2' icon={<BankOutlined />}>
                <Link to={'/tests-bank'}>Tests bank</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<BookOutlined />}>
                Generated tickets
            </Menu.Item>
            <Menu.Item key='4' icon={<BookOutlined />}>
                <Link to={'/profile'}>Profile</Link>
            </Menu.Item>
        </Menu>
    )
}

export { SideBar }
