import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { useSelector } from 'react-redux'
import { AppStateInterface } from '../state/_store/rootReducer'

export interface IPrivateRouteProps extends RouteProps {
    redirectPath: string
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
    const { isLogin } = useSelector((state: AppStateInterface) => state.auth)
    return isLogin ? <Route {...props} component={props.component} render={undefined} /> : <Redirect to={{ pathname: props.redirectPath }} />
}

export default PrivateRoute
