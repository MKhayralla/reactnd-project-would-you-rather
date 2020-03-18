import React from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { handleVote } from '../store/shared'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Link } from 'react-router-dom'
import User from './user'



const ShowQuestion = (props) => {
    const { question, answer, users, dispatch } = props
    let option_one_percent = 0
    if (question) {
        const all_answers = question.optionOne.votes.length + question.optionTwo.votes.length
        const optionOne_answers = question.optionOne.votes.length
        option_one_percent = Math.round(optionOne_answers / all_answers * 100)
    }
    return (
        <Container>
            <Row>
                <Col xs={2} as={Link} to="/polls" className="back-button"></ Col>
                <Col xs={10} as="h5" style={{top : 3}}> Would you rather ?</ Col>
            </ Row>
            {question ?
                ((answer) ? (
                    <Row>
                        <Col xs={12}><Row><User user={users[question.author]} /></ Row></ Col>
                        <Col xs={6} className="red option">
                            <Row>
                            <span>{question.optionOne.text}</ span><span>({option_one_percent} %)</ span>
                            {answer === 'optionOne' ? <span className="chosen">✔</ span> : <span />}
                            </ Row>
                            <Row>
                            <span>{question.optionOne.votes.length} vote(s)</ span>
                            </ Row>
                            {
                                question.optionOne.votes.map((uid) =>(
                                    <Row key={uid}><User user={users[uid]} /></ Row>
                                ))
                            }                    
                        </ Col>
                        <Col xs={6} className="blue option">
                            <Row>
                            <span>{question.optionTwo.text}</ span><span>({100 - option_one_percent} %)</ span>
                            {answer === 'optionTwo' ? <span className="chosen">✔</ span> : <span />}
                            </ Row>
                            <Row>
                            <span>{question.optionTwo.votes.length} vote(s)</span>
                            </ Row>
                            {
                                question.optionTwo.votes.map((uid) =>(
                                    <Row key={uid}><User user={users[uid]} /></ Row>
                                ))
                            }
                        </ Col>
                    </ Row>
                ) : (
                        <Row>
                            <Col xs={12}><Row><User user={users[question.author]} /></ Row></ Col>
                            <Col xs={6} className="red clickable choices option"
                                onClick={()=>dispatch(handleVote(question.id, 'optionOne'))}>
                                <span>{question.optionOne.text}</span>
                            </ Col >
                            <Col xs={6} className="blue clickable choices option"
                                onClick={()=>dispatch(handleVote(question.id, 'optionTwo'))}>
                                <span>{question.optionTwo.text}</span>
                            </ Col>
                        </ Row >
                    )) : (
                    <Row>
                        <Col xs={{'span': 10, 'offset':1}} md={{'span':8,'offset':2}}>
                        <Alert variant="danger">question not found<Link to="/polls" className="clickable">go to polls</ Link></ Alert>
                        </ Col>
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
    return { question, answer , users }
}

export default withRouter(connect(mapStateToProps)(ShowQuestion))
