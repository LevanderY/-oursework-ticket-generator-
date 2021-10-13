import React from 'react'
import { Col, Row } from 'antd'
import { SideBar } from '../SideBar'
import { Header } from '../Header'

const NavigationBar: React.FC = ({ children }) => (
    <Row>
        <Col span={3}>
            <SideBar />
        </Col>
        <Col span={21}>
            <Header />
            <div className='container'>{children}</div>
        </Col>
    </Row>
)

export { NavigationBar }
