import React from 'react';
import { handleLogin } from '../store/shared'
import { Container, Row } from 'react-bootstrap';
import User from './user'
import { connect } from 'react-redux'
const Login = (props) => {

  const { users, dispatch } = props
  return (
    <Container>
      <Row><h3>please login first</ h3></ Row>
      {users.map((user) => (
        <Row className="login user" key={user.id} onClick={() => dispatch(handleLogin(user.id))}>
          <User user={user} />
        </ Row>
      ))}
    </ Container>
  )

}

function mapStateToProps(state) {
  const { users } = state
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(Login)