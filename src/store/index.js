import {combineReducers} from 'redux'
import questions from './questions'
import users from './users'
import authedUser from './autheduser'

export default combineReducers({questions, users, authedUser})