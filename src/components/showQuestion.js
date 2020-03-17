import React from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { handleVote } from '../store/shared'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import User from './user'


const ShowQuestion = (props) => {
    const { question, answer, authedUser, users, dispatch } = props
    return (
        <Container>
            <Row>
                <h3> Would you rather ?</ h3>
            </ Row>
            {question ?
                ((answer||!(authedUser)) ? (
                    <Row>
                        <Col xs={6} className="red option">
                            <Row>
                            {question.optionOne.text}
                            {answer === 'optionOne' ? <span class="chosen">(your choice)</ span> : <span />}
                            </ Row>
                            {
                                question.optionOne.votes.map((uid) =>(
                                    <Row><User user={users[uid]} /></ Row>
                                ))
                            }
                        </ Col>
                        <Col xs={6} className="blue option">
                            <Row>
                            {question.optionTwo.text}
                            {answer === 'optionTwo' ? <span class="chosen">(your choice)</ span> : <span />}
                            </ Row>
                            {
                                question.optionTwo.votes.map((uid) =>(
                                    <Row><User user={users[uid]} /></ Row>
                                ))
                            }
                        </ Col>
                    </ Row>
                ) : (
                        <Row>
                            <Col xs={6} className="red clickable choices option"
                                onClick={()=>dispatch(handleVote(question.id, 'optionOne'))}>
                                {question.optionOne.text}
                            </ Col >
                            <Col xs={6} className="blue clickable choices option"
                                onClick={()=>dispatch(handleVote(question.id, 'optionTwo'))}>
                                {question.optionTwo.text}
                            </ Col>
                        </ Row >
                    )) : (
                    <Row>
                        <Alert variant="danger">question not found<Link to="/polls" className="clickable">go to polls</ Link></ Alert>
                    </ Row>
                )
            }
        </ Container >
    )
}


function mapStateToProps(state, other) {
    const qid = other.match.params['id']
    const { questions, authedUser, users } = state
    const question = questions[qid]
    const answer = question && ((authedUser&&users[authedUser].answers[qid]) || null)
    return { question, answer ,authedUser, users }
}

export default withRouter(connect(mapStateToProps)(ShowQuestion))
