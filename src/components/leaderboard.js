import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import User from './user'

const Leaderboard = (props) => {
    const { stats, authedUser } = props
    if (!authedUser) {
        return (
          <Redirect to="/login" />
        )
      }
    return (
        <Container>
            <Row className="table-header">
                <Col xs={4}>
                    User Name
                    </ Col>
                <Col xs={4}>
                    # of Questions
                    </ Col>
                <Col xs={4}>
                    # of answers
                    </ Col>
            </ Row>
            {stats?(stats.sort((a, b) => b.interact - a.interact)
                .map((user) => (
                    <Row className="table-row">
                        <Col xs={4}>
                            <User user={user} />
                        </ Col>
                        <Col xs={4}>
                            {user.n_questions}
                        </ Col>
                        <Col xs={4}>
                            {user.n_answers}
                        </ Col>
                    </ Row>
                ))): <hr />}
        </ Container>
    )
}

function mapStateToProps(state) {
    const { users, authedUser } = state
    const stats = Object.values(users).map((user) => {
        const { name, avatarURL } = user
        const n_answers = Object.keys(user.answers).length
        const n_questions = user.questions.length
        const interact = n_answers + n_questions
        return { name, avatarURL, n_answers, n_questions, interact }
    })
    return {stats, authedUser}
}

export default connect(mapStateToProps)(Leaderboard)