import React, { useState, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import PrivateRoute from '../../utils/privateRoute'
import { NavigationBar } from '../NavigationBar'
import { SignInForm } from '../SignInForm'
import { SignUpForm } from '../SignUpForm'
import { ProfilePage, TestBankPage, TestsListPage, TicketsPage } from '../../pages'

import './reset.css'
import 'antd/dist/antd.css'

const Root: React.FC = () => {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitionStage, setTransitionStage] = useState('fadeIn')

    const onAnimationHandler = () => {
        if (transitionStage === 'fadeOut') {
            setTransitionStage('fadeIn')
            setDisplayLocation(location)
        }
    }

    useEffect(() => {
        if (location !== displayLocation) setTransitionStage('fadeOut')
    }, [location, displayLocation])

    return (
        <div className={`${transitionStage}`} onAnimationEnd={onAnimationHandler}>
            <Switch location={displayLocation}>
                <Route path={'/signup'} component={SignUpForm} />
                <Route path={'/login'} component={SignInForm} />
                <NavigationBar>
                    <PrivateRoute redirectPath={'/login'} path={'/tests-bank'} component={TestBankPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/test/:id'} component={TestsListPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/tickets'} component={TicketsPage} />
                    <PrivateRoute redirectPath={'/login'} path={'/profile'} component={ProfilePage} />
                </NavigationBar>
            </Switch>
        </div>
    )
}

export { Root }
