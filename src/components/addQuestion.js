import React, { useState } from 'react'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import { handleAddQuestion } from '../store/shared'
import { connect } from 'react-redux'

const AddQuestion = (props) => {
    const {authedUser} = props
    const [optionOne, changeOptionOne] = useState('')
    const [optionTwo, changeOptionTwo] = useState('')
    if (!authedUser) {
        return (
          <Redirect to="/login" />
        )
      }
    return (
        <Container>
            <Row>
                <Col xs={12} md={{ 'span': 8, 'offset': 2 }}><h3>would you rather</ h3></ Col>
                <Col xs={12} md={{ 'span': 8, 'offset': 2 }}>
                    <Form onSubmit={
                        (e) => {
                            e.preventDefault()
                            if (optionOne.trim() === '') {
                                return alert('fill option one')
                            }
                            if (optionTwo.trim() === '') {
                                return alert('fill option Two')
                            }
                            props.dispatch(handleAddQuestion(optionOne, optionTwo))
                            changeOptionOne('')
                            changeOptionTwo('')
                        }
                    }>
                        <FormControl type="text" placeholder="option one" name="OptionOne"
                        value={optionOne}
                        onChange={(e) => changeOptionOne(e.target.value)}
                        className="form-field" />
                        <FormControl type="text" placeholder="option two" name="OptionTwo"
                        value={optionTwo}
                        onChange={(e) => changeOptionTwo(e.target.value)}
                        className="form-field" />
                        <Button type="submit" variant="outline-primary">
                            Add Poll
                    </ Button>
                    </ Form>
                </ Col>
            </ Row>
        </ Container>
    )
}
function mapStateToProps({authedUser}) {
    return {authedUser}
}
export default connect(mapStateToProps)(AddQuestion)