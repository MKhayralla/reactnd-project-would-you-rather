import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import User from './user'
import { connect } from 'react-redux'
const Question = (props) => {
    const { q, user } = props
    const date = new Date(q.timestamp)
    const dom = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return (
        <Row>

            <Col xs={12} md={{ 'span': 6, 'offset': 3 }}>
                <Link to={`/polls/${q.id}`}>
                    <Row><User user={user} /></ Row>
                    <Row className="date">at : {`${dom}/${month+1}/${year}`}</ Row>
                    <p className="question">
                        {q.optionOne.text} <br /><big>or</ big><br /> {q.optionTwo.text}
                    </ p>
                </ Link>
            </ Col>

        </ Row>
    )
}

const Questions = (props) => {
    const { answered, unanswered, users, authedUser } = props
    if (!authedUser) {
        return (
          <Redirect to="/login" />
        )
      }

    return (
        <Container>
            <Tabs defaultActiveKey="unanswered" id="component-tabs">
                <Tab eventKey="answered" title="answered questions">
                    {answered.sort((a, b)=>b.timestamp-a.timestamp).map((q) => (
                        <Question q={q} key={q.id} user={users[q.author]} />
                    ))}
                </ Tab>
                <Tab eventKey="unanswered" title="unanswered questions">
                    {unanswered.sort((a, b)=>b.timestamp-a.timestamp).map((q) => (
                        <Question q={q} key={q.id} user={users[q.author]} />
                    ))}
                </ Tab>
            </ Tabs>
            {authedUser&&(<Link to="/add" className="add-button"><button /></ Link>)}
        </ Container>
    )
}

function mapStateToProps(state) {
    const { users, questions, authedUser } = state
    const allQuestions = Object.values(questions)
    const currentUser = users[authedUser]
    const answered = authedUser ? (allQuestions.filter((q) => Object.keys(currentUser.answers).includes(q.id))) : []
    const unanswered = authedUser ? (allQuestions.filter((q) => !Object.keys(currentUser.answers).includes(q.id))) : allQuestions
    return { answered, unanswered, users, authedUser }
}
export default connect(mapStateToProps)(Questions)
