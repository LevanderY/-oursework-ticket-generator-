import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../utils/privateRoute'
import { NavigationBar, SignInForm, SignUpForm } from '../../components'
import { TestBankPage, TestsListPage, TicketsPage, PdfTicketPage, GetStartedPage } from '../../pages'

import './reset.css'
import 'antd/dist/antd.css'

const Root: React.FC = () => {
    return (
        <>
            <Switch>
                <Route path={'/signup'} component={SignUpForm} />
                <Route path={'/login'} component={SignInForm} />
                <NavigationBar>
                    <PrivateRoute exact redirectPath={'/login'} path={'/'} component={GetStartedPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/tests-bank'} component={TestBankPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/test/:id'} component={TestsListPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/tickets'} component={TicketsPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/ticket-pdf/:id'} component={PdfTicketPage} />
                </NavigationBar>
            </Switch>
        </>
    )
}

export { Root }
