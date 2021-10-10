import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

export interface IPrivateRouteProps extends RouteProps {
    redirectPath: string
    currU?: any
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
    return props.currU ? <Route {...props} component={props.component} render={undefined} /> : <Redirect to={{ pathname: props.redirectPath }} />
}

export default PrivateRoute
