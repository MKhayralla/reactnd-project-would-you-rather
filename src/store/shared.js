import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA'
import { load_questions, load_users, add_question, vote, log_in, log_out } from './actions'
import  history from '../history'

export function handleLogin(id) {
    return (dispatch) => {
        dispatch(log_in(id))
        history.push('polls')
    }
}
export function handleLogout() {
    return (dispatch) => {
        dispatch(log_out())
        history.push('login')
    }
}
export function handleInitialData() {
    return (dispatch) => {
        _getUsers().then((users) => {
            dispatch(load_users(users))
            _getQuestions().then((questions) => dispatch(load_questions(questions)))
        }).catch((err) => { throw new Error(err) })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        _saveQuestion({ optionOneText, optionTwoText, 'author': authedUser })
            .then((question) => {
                dispatch(add_question({ question, authedUser }))
                history.push('polls')
            }).catch((err) => {
                console.log(new Error(err))
                alert('please login')
            })
    }
}

export function handleVote(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        _saveQuestionAnswer({ authedUser, qid, answer })
            .then(dispatch(vote({ qid, answer, authedUser })))
            .catch((err) => {
                console.log(new Error(err))
                alert('please login')
            })
    }
}