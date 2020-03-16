import React from 'react';
import { log_in } from '../store/actions'
import { Container, Row } from 'react-bootstrap';
import User from './user'
import { connect } from 'react-redux'
const Login = (props) => {

  const { users, dispatch } = props
  return (
    <Container>
      {users.map((user) => (
        <Row className="login user" key={user.id} onClick={() => dispatch(log_in(user.id))}>
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