import * as ActionTypes from '../ActionType'

const initalState = {
    isLoding : false,
    order : [],
    error: ''
}


export const OrderReducers = (state = initalState, action) => {
    // console.log(action.payload, action.type);
    switch (action.type) {
        case ActionTypes.GET_ORDER : 
            return {
                ...state,
                isLoding : false,
                order : action.payload,
                error : ''
            }
        case ActionTypes.POST_ORDER : 
            return {
                ...state,
                isLoding : false,
                order : state.doctor.concat(action.payload),
                error : ''
            }
        default : 
            return state
    }
}