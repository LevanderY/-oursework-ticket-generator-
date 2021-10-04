import React from 'react'
import { HomeOutlined, BankOutlined, BookOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

const SideBar: React.FC = () => {
    return (
        <Menu style={{ height: '100vh' }} defaultSelectedKeys={['1']} mode={'vertical'} theme={'dark'}>
            <Menu.Item key='1' icon={<HomeOutlined />}>
                Home
            </Menu.Item>
            <Menu.Item key='2' icon={<BankOutlined />}>
                Tests bank
            </Menu.Item>
            <Menu.Item key='3' icon={<BookOutlined />}>
                Generated tickets
            </Menu.Item>
        </Menu>
    )
}

export { SideBar }