import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import User from './user'
import { connect } from 'react-redux'
const Question = (props) => {
    const { q, user } = props
    return (
        <Row>

            <Col xs={12} md={{ 'span': 6, 'offset': 3 }}>
                <Link to={`/polls/${q.id}`}>
                    <Row><User user={user} /></ Row>
                    <p className="question">
                        {q.optionOne.text} <br /><big>or</ big><br /> {q.optionTwo.text}
                    </ p>
                </ Link>
            </ Col>

        </ Row>
    )
}

const Questions = (props) => {
    const { answered, unanswered, users } = props
    console.log(answered, unanswered);

    return (
        <Container>
            <Tabs defaultActiveKey="unanswered" id="component-tabs">
                <Tab eventKey="answered" title="answered questions">
                    {answered.map((q) => (
                        <Question q={q} key={q.id} user={users[q.author]} />
                    ))}
                </ Tab>
                <Tab eventKey="unanswered" title="unanswered questions">
                    {unanswered.map((q) => (
                        <Question q={q} key={q.id} user={users[q.author]} />
                    ))}
                </ Tab>
            </ Tabs>
            <Link to="/add" className="add-button"><button /></ Link>
        </ Container>
    )
}

function mapStateToProps(state) {
    const { users, questions, authedUser } = state
    const allQuestions = Object.values(questions)
    const currentUser = users[authedUser]
    const answered = authedUser ? (allQuestions.filter((q) => Object.keys(currentUser.answers).includes(q.id))) : []
    const unanswered = authedUser ? (allQuestions.filter((q) => !Object.keys(currentUser.answers).includes(q.id))) : allQuestions
    return { answered, unanswered, users }
}
export default connect(mapStateToProps)(Questions)