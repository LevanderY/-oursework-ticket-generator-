import React, { useState } from 'react'
import { Menu, Divider, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { BankOutlined, AppstoreOutlined, BookOutlined, MenuUnfoldOutlined, AlignLeftOutlined, ArrowLeftOutlined } from '@ant-design/icons'

const SideBarNavigation: React.FC = () => {
    const [isToggleCollapse, setIsToggleCollapse] = useState<boolean>(true)
    const onCollapseHandler = () => setIsToggleCollapse((prevState: boolean) => !prevState)
    const onBackHandler = () => window.history.back()

    return (
        <Menu style={{ height: '100vh' }} defaultSelectedKeys={['1']} mode={'vertical'} theme={'dark'} inlineCollapsed={isToggleCollapse}>
            <Row>
                <Col>
                    <Divider key={'7'} orientation={'left'}>
                        {!isToggleCollapse && (
                            <Button ghost onClick={onBackHandler}>
                                <ArrowLeftOutlined />
                            </Button>
                        )}
                    </Divider>
                </Col>
                <Col>
                    <Divider key='5' orientation={'right'}>
                        <Button ghost onClick={onCollapseHandler}>
                            {isToggleCollapse ? <MenuUnfoldOutlined /> : <AlignLeftOutlined />}
                        </Button>
                    </Divider>
                </Col>
            </Row>
            <Menu.Item key='1' icon={<AppstoreOutlined />}>
                <Link to={'/'}>Get Stared</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<BankOutlined />}>
                <Link to={'/tests-bank'}>Tests bank</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<BookOutlined />}>
                <Link to={'/tickets'}>Generated tickets</Link>
            </Menu.Item>
        </Menu>
    )
}

export { SideBarNavigation }
