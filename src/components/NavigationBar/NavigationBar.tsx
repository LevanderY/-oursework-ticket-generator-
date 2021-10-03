import React from 'react'
import { MailOutlined, CalendarOutlined, AppstoreOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
const { SubMenu } = Menu

const NavigationBar: React.FC = () => {
    return (
        <Menu style={{ width: 150, height: '100vh' }} defaultSelectedKeys={['1']} mode={'vertical'} theme={'dark'}>
            <Menu.Item key='1' icon={<MailOutlined />}>
                Navigation One
            </Menu.Item>
            <Menu.Item key='2' icon={<CalendarOutlined />}>
                Navigation Two
            </Menu.Item>
            <SubMenu key='sub1' icon={<AppstoreOutlined />} title='Navigation Two'>
                <Menu.Item key='3'>Option 3</Menu.Item>
                <Menu.Item key='4'>Option 4</Menu.Item>
                <SubMenu key='sub1-2' title='Submenu'>
                    <Menu.Item key='5'>Option 5</Menu.Item>
                    <Menu.Item key='6'>Option 6</Menu.Item>
                </SubMenu>
            </SubMenu>
        </Menu>
    )
}

export default NavigationBar
