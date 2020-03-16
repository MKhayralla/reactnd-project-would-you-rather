import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { handleVote } from '../store/shared'
import { connect } from 'react-redux'



const ShowQuestion = (props) => {
    const { question, answer, dispatch } = props
    return (
        <Container>
            <Row>{ answer }</ Row>
            <Row>
                <h3> Would you rather ?</ h3>
            </ Row>
            {question ?
                (answer ? (
                    <Row className="choices">
                        <Col xs={6} className="red">
                            {question.optionOne.text}({question.optionOne.votes.length} votes)
                            {answer === 'optionOne' ? <span class="chosen">(your choice)</ span> : <span />}
                        </ Col>
                        <Col xs={6} className="blue">
                            {question.optionTwo.text}({question.optionTwo.votes.length} votes)
                            {answer === 'optionTwo' ? <span class="chosen">(your choice)</ span> : <span />}
                        </ Col>
                    </ Row>
                ) : (
                        <Row>
                            <Col xs={6} className="red clickable choices"
                                onClick={()=>dispatch(handleVote(question.id, 'optionOne'))}>
                                {question.optionOne.text}
                            </ Col >
                            <Col xs={6} className="blue clickable choices"
                                onClick={()=>dispatch(handleVote(question.id, 'optionTwo'))}>
                                {question.optionTwo.text}
                            </ Col>
                        </ Row >
                    )) : (
                    <p>not found</ p>
                )
            }
        </ Container >
    )
}


function mapStateToProps(state, other) {
    const { qid } = other
    const { questions, authedUser, users } = state
    const question = questions[qid]
    const answer = question && ((authedUser&&users[authedUser].answers[qid]) || null)
    return { question, answer }
}

export default connect(mapStateToProps)(ShowQuestion)