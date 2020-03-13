import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap' ;
import users from './store/_DATA'
import './App.css';

function App() {
  return (
    <Container className="App">
      <Row>
        <h1>please log in first : </h1><br /><hr />
      </Row>
      {users.map((user) => (
        <Row height={25} key={user.id} className="user">
          <Col xs={4}>
            <Image src={user.avatarURL} roundedCircle height={20} width={20} />
          </ Col>
          <Col xs={8}>
            <span className="user-name">{user.name}</span>
          </ Col>
        </ Row>
      ))}
    </ Container>
  );
}

export default App;
