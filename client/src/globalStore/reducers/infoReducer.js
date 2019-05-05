import {SET_Skills,SET_MasterClasses} from '../actions/types'

const initialState ={
    masterclass: [],
    skills:[],
   
};

export default function (state = initialState, action ){
    switch(action.type){
        case SET_MasterClasses:
            return {
            ...state,
            masterclass:action.payload
        }
        case SET_Skills:
        return {
        ...state,
        skills:action.payload
    }
        default:
        return state;
    }
}