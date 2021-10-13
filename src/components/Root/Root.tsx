import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { NavigationBar } from '../NavigationBar'
import { SignInForm } from '../SignInForm'
import { SignUpForm } from '../SignUpForm'
import { ProfilePage, TestBankPage } from '../../pages'
import PrivateRoute from '../../utils/privateRoute'

import './reset.css'
import 'antd/dist/antd.css'

const Root: React.FC = () => {
    return (
        <Switch>
            <Route path={'/signup'} component={SignUpForm} />
            <Route path={'/login'} component={SignInForm} />
            <NavigationBar>
                <PrivateRoute redirectPath={'/login'} path={'/'} component={TestBankPage} />
                <PrivateRoute redirectPath={'/login'} path={'/profile'} component={ProfilePage} />
            </NavigationBar>
        </Switch>
    )
}

export { Root }
