import React from 'react'
import { Col, Row } from 'antd'
import { SideBar } from '../SideBar'
import { Header } from '../Header'
import { SignInForm } from '../SignInForm'
import { SignUpForm } from '../SignUpForm'

import './reset.css'
import 'antd/dist/antd.css'

const Root: React.FC = () => {
    return (
        <Row>
            <Col span={3}>
                <SideBar />
            </Col>
            <Col span={21}>
                <Header />
                <div className='container'>
                    <SignInForm />
                </div>
            </Col>
        </Row>
    )
}

export { Root }
