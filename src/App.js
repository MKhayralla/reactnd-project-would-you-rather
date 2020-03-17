import React, { useEffect, Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Route, Switch, Redirect} from 'react-router-dom'
import { handleInitialData } from './store/shared'
import Navigate from './components/navbar'
import Login from './components/login'
import Questions from './components/questions'
import Leaderboard from './components/leaderboard'
import AddQuestion from './components/addQuestion'
import ShowQuestion from './components/showQuestion'
import LoadingBar from 'react-redux-loading'

const App = (props) => {
  /* disabling the hook warning 
  since we need to load data only on mount not on update 
  (no dependencies needed)*/
  // eslint-disable-next-line
  useEffect(() => props.dispatch(handleInitialData()), [])
  const {authedUser} = props
  return (
    <Fragment>
      <Navigate />
      <LoadingBar />
        <Switch>
          <Route exact path='/' render={()=>authedUser?(<Redirect to="/polls" />):(<Redirect to="/login" />)} />
          <Route path='/login' component={Login} />
          <Route exact path='/polls' component={Questions} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/add' component={AddQuestion} />
          <Route path='/polls/:id' component={ShowQuestion} />
        </ Switch>
    </ Fragment>
  )
}

function mapStateToprops(state) {
  const {authedUser} = state
  return {authedUser}
}

export default connect(mapStateToprops)(App);
