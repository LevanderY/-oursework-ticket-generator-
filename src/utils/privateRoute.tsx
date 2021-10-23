import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

export interface IPrivateRouteProps extends RouteProps {
    redirectPath: string
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
    const token = localStorage.getItem('token')
    return token ? <Route {...props} component={props.component} render={undefined} /> : <Redirect to={{ pathname: props.redirectPath }} />
}

export default PrivateRoute
