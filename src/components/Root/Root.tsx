import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../utils/privateRoute'
import { NavigationBar, SignInForm, SignUpForm } from '../../components'
import { ProfilePage, TestBankPage, TestsListPage, TicketsPage, PdfTicketPage } from '../../pages'

import './reset.css'
import 'antd/dist/antd.css'

const Root: React.FC = () => {
    return (
        <>
            <Switch>
                <Route path={'/signup'} component={SignUpForm} />
                <Route path={'/login'} component={SignInForm} />
                <NavigationBar>
                    <PrivateRoute redirectPath={'/login'} path={'/tests-bank'} component={TestBankPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/test/:id'} component={TestsListPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/tickets'} component={TicketsPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/profile'} component={ProfilePage} />
                    <PrivateRoute redirectPath={'/login'} path={'/ticket-pdf/:id'} component={PdfTicketPage} />
                </NavigationBar>
            </Switch>
        </>
    )
}

export { Root }
