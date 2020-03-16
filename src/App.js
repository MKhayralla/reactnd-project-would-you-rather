import React, { useEffect } from 'react';

import './App.css';
import { connect } from 'react-redux'
import { handleInitialData } from './store/shared'
import Navigate from './components/navbar'
import Login from './components/login'
import Questions from './components/questions'
import Leaderboard from './components/leaderboard'
import AddQuestion from './components/addQuestion'
import ShowQuestion from './components/showQuestion'

const App = (props) => {
  /* disabling the hook warning 
  since we need to load data only on mount not on update 
  (no dependencies needed)*/
  // eslint-disable-next-line
  useEffect(() => props.dispatch(handleInitialData()), [])
  return (
    <div>
      <Navigate />
      <Login />
      <Questions />
      <Leaderboard />
      <AddQuestion />
      <ShowQuestion qid="loxhs1bqm25b708cmbf3g" />
      <ShowQuestion qid="vthrdm985a262al8qx3do" />
      <ShowQuestion qid="6ni6ok3ym7mf1p33lnez" />
    </ div>
  )
}



export default connect()(App);
