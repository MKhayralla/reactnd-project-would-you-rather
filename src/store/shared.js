import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA'
import { load_questions, load_users, add_question, vote, log_in, log_out } from './actions'
import {showLoading, hideLoading} from 'react-redux-loading'
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
        history.push('')
    }
}
export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        _getUsers().then((users) => {
            dispatch(load_users(users))
            _getQuestions().then((questions) => {
                dispatch(load_questions(questions))
                dispatch(hideLoading())
            })
        }).catch((err) => {
            dispatch(hideLoading()) 
            throw new Error(err)  
        })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        dispatch(showLoading())
        const { authedUser } = getState()
        _saveQuestion({ optionOneText, optionTwoText, 'author': authedUser })
            .then((question) => {
                dispatch(add_question({ question, authedUser }))
                history.push('polls')
                dispatch(hideLoading())
            }).catch((err) => {
                dispatch(hideLoading())
                console.log(new Error(err))
                alert('please login')
            })
    }
}

export function handleVote(qid, answer) {
    return (dispatch, getState) => {
        dispatch(showLoading())
        const { authedUser } = getState()
        _saveQuestionAnswer({ authedUser, qid, answer })
            .then(()=>{
                dispatch(vote({ qid, answer, authedUser }))
                dispatch(hideLoading())
            })
            .catch((err) => {
                dispatch(hideLoading())
                console.log(new Error(err))
                alert('please login')
            })
    }
}