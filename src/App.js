import React, {Component} from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap' ;
import './App.css';
import {connect} from 'react-redux'
import {handleInitialData} from './store/shared'

class App extends Component {
  componentDidMount = () =>{
    this.props.dispatch(handleInitialData())
  }
  render = () => (
      <Container className="App">
        <Row>
          <h1>please log in first : </h1><br /><hr />
        </Row>
        {this.props.users.map((user) => (
          <Row height={25} key={user.id} className="user">
            <Col xs={4}>
              <Image src={user.avatarURL} roundedCircle height={25} width={25} />
            </ Col>
            <Col xs={8}>
              <span className="user-name">{user.name}</span>
            </ Col>
          </ Row>
        ))}
      </ Container>
    )
}

function mapStateToProps(state) {
  const {users} = state
  return {
    users : Object.values(users)
  }
}

export default connect(mapStateToProps)(App);
