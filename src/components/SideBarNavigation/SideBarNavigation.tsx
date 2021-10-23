import React, { useState } from 'react'
import { Menu, Divider, Button } from 'antd'
import { Link } from 'react-router-dom'
import { BankOutlined, BookOutlined, MenuUnfoldOutlined, AlignLeftOutlined } from '@ant-design/icons'

const SideBarNavigation: React.FC = () => {
    const [isToggleCollapse, setIsToggleCollapse] = useState<boolean>(true)
    const onCollapseHandler = () => setIsToggleCollapse((prevState: boolean) => !prevState)

    return (
        <Menu style={{ height: '100vh' }} defaultSelectedKeys={['1']} mode={'vertical'} theme={'dark'} inlineCollapsed={isToggleCollapse}>
            <Divider orientation={'left'}>
                <Button ghost onClick={onCollapseHandler}>
                    {isToggleCollapse ? <MenuUnfoldOutlined /> : <AlignLeftOutlined />}
                </Button>
            </Divider>
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

export { SideBarNavigation }
