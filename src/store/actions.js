export const LOAD_QUESTIONS = 'LOAD_QUESTIONS'
export const LOAD_USERS = 'LOAD_USERS'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADD_QUESTION = 'ADD_QUESTION'
export const VOTE = 'VOTE'

export function load_questions(questions) {
    return {
        type : LOAD_QUESTIONS,
        questions
    }
}

export function load_users(users) {
    return {
        type : LOAD_USERS,
        users
    }
}

export function log_in(user_id) {
    return {
        type : LOGIN,
        user_id
    }
}

export function log_out() {
    return {
        type : LOGOUT
    }
}

export function add_question(info) {
    return {
        type : ADD_QUESTION,
        ...info
    }
}

export function vote(info) {
    return {
        type : VOTE,
        ...info
    }
}