import {LOAD_QUESTIONS, ADD_QUESTION, VOTE} from './actions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return {...state, ...action.questions}
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id] : action.question
            }
        case VOTE:
            return {
                ...state,
                [action.qid] : {
                    ...state[action.qid],
                    [action.answer] : {
                        ...state[action.qid][action.answer],
                        votes : state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
    
        default:
            return state ;
    }
}