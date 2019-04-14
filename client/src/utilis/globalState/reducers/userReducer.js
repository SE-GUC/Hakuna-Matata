import { GET_USERS, CREATE_USER } from '../actions/actionTypes'

const initialState = {
    users: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:   
        return {
            ...state,
            users: action.payload
        }
        case CREATE_USER:   
        return {
            ...state,
        }
        default: return state
    }
}