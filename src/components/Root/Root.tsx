import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../utils/privateRoute'
import { NavigationBar } from '../NavigationBar'
import { SignInForm } from '../SignInForm'
import { SignUpForm } from '../SignUpForm'
import { ProfilePage, TestBankPage, TestsListPage } from '../../pages'

import './reset.css'
import 'antd/dist/antd.css'
import { TicketsPage } from '../../pages/TicketsPage'

const Root: React.FC = () => {
    return (
        <Switch>
            <Route path={'/signup'} component={SignUpForm} />
            <Route path={'/login'} component={SignInForm} />
            <NavigationBar>
                <PrivateRoute redirectPath={'/login'} path={'/tests-bank'} component={TestBankPage} />
                <PrivateRoute redirectPath={'/login'} path={'/test/:id'} component={TestsListPage} />
                <PrivateRoute redirectPath={'/login'} path={'/tickets'} component={TicketsPage} />
                <PrivateRoute redirectPath={'/login'} path={'/profile'} component={ProfilePage} />
            </NavigationBar>
        </Switch>
    )
}

export { Root }
