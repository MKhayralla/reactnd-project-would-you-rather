import {LOAD_USERS, ADD_QUESTION, VOTE} from './actions'

export default function users(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, ...action.users}

        case ADD_QUESTION:
            return {
                ...state,
                [action.authedUser] : {
                    ...state[action.authedUser],
                    questions : state[action.authedUser].questions.concat([action.question.id])
                }
            }

        case VOTE:
            return {
                ...state,
                [action.authedUser] : {
                    ...state[action.authedUser],
                    answers : {
                        ...state[action.authedUser].answers,
                        [action.qid] : action.answer
                    }
                }
            }
    
        default:
            return state ;
    }
    
}