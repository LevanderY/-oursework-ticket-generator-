import React from 'react'
import { Col, Row } from 'antd'
import { Header } from '../Header'
import { SideBarNavigation } from '../SideBarNavigation'

const NavigationBar: React.FC = ({ children }) => (
    <Row wrap={false}>
        <Col>
            <SideBarNavigation />
        </Col>
        <Col flex='auto'>
            <Row>
                <Col span={'24'}>
                    <Header />
                </Col>
                <Col span={'24'}>{children}</Col>
            </Row>
        </Col>
    </Row>
)

export { NavigationBar }
