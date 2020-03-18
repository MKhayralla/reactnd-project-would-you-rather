import React, { useEffect, Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Switch, Route, Redirect} from 'react-router-dom'
import { handleInitialData } from './store/shared'
import Navigate from './components/navbar'
import Login from './components/login'
import Questions from './components/questions'
import Leaderboard from './components/leaderboard'
import AddQuestion from './components/addQuestion'
import ShowQuestion from './components/showQuestion'
import ProtectedRoute from './components/protectedRoute'
import LoadingBar from 'react-redux-loading'

const App = (props) => {
  const {dispatch} = props
  useEffect(() => dispatch(handleInitialData()), [dispatch])
  return (
    <Fragment>
      <Navigate />
      <LoadingBar />
        <Switch>
          <Route exact path='/' render={()=>(<Redirect to="/polls" />)} />
          <Route path='/login' component={Login} />
          <ProtectedRoute path='/polls' component={Questions} />
          <ProtectedRoute path='/leaderboard' component={Leaderboard} />
          <ProtectedRoute path='/add' component={AddQuestion} />
          <ProtectedRoute path='/questions/:id' component={ShowQuestion} />
        </ Switch>
    </ Fragment>
  )
}



export default connect()(App);
