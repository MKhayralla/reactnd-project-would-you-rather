import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer} from './_DATA'
import {load_questions, load_users, add_question, vote} from './actions'

export function handleInitialData() {
    return (dispatch) => {
        _getUsers().then((users) => {
            dispatch(load_users(users))
            _getQuestions().then((questions) => dispatch(load_questions(questions)))
        }).catch((err) => {throw new Error(err)})
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        _saveQuestion({ optionOneText, optionTwoText, 'author' : authedUser })
        .then((question) =>{
            dispatch(add_question({question, authedUser}))
        }).catch((err) => {throw new Error(err)})
    }
}

export function handleVote(qid, answer) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        _saveQuestionAnswer({authedUser, qid, answer})
        .then(dispatch(vote({qid, answer, authedUser})))
        .catch((err) => {throw new Error(err)})
    }
}