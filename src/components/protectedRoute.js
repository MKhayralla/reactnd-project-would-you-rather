import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { connect } from 'react-redux'

const protectedRoute = ({authedUser, component : Component, path : Path, ...other}) => {
    return (
        <Route {...other} path={Path} render={(props)=>authedUser?(<Component {...props} />):(
            <Redirect push to="/login" />
        )}></ Route>
    )
}

function mapStateToProps({authedUser}, {component, path , ...other}) {
    return {...other, authedUser, component, path}
}

export default connect(mapStateToProps)(protectedRoute)