import React from 'react'
import { Col, Row } from 'antd'
import { Header } from '../Header'
import { SideBarNavigation } from '../SideBarNavigation'

const NavigationBar: React.FC = ({ children }) => (
    <Row wrap>
        <Col>
            <SideBarNavigation />
        </Col>
        <Col flex='auto'>
            <Header />
            <div className='container'>{children}</div>
        </Col>
    </Row>
)

export { NavigationBar }
