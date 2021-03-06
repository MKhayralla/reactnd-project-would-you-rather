import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import User from './user'

const Leaderboard = (props) => {
    const { stats } = props
    return (
        <Container>
            <Row>
                <Col xs={2} as={Link} to="/polls" className="back-button"></ Col>
                <Col xs={10} as="h3" style={{ top: 1 }}> Leaderboard</ Col>
            </ Row>
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
            {stats ? (stats.sort((a, b) => b.interact - a.interact)
                .map((user) => (
                        <Row key={user.id} className="table-row">
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
                ))) : <hr />}
        </ Container>
    )
}

function mapStateToProps(state) {
    const { users } = state
    const stats = Object.values(users).map((user) => {
        const { id, name, avatarURL } = user
        const n_answers = Object.keys(user.answers).length
        const n_questions = user.questions.length
        const interact = n_answers + n_questions
        return { id, name, avatarURL, n_answers, n_questions, interact }
    })
    return { stats }
}

export default connect(mapStateToProps)(Leaderboard)
