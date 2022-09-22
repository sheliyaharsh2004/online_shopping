import * as ActionType from '../ActionType'

const initalstate = {
    isLoading: false,
    cart: [],
    error: "",
}

export const Cartreducer  = (state=initalstate , action) => {

    switch (action.type) {
        case ActionType.CART_GET_DATA :
            return {
                ...state,
                isLoading: false,
                error: ""
            }
        case ActionType.CART_ADD_DATA :
            return {
                ...state,
                isLoading: false,
                cart: state.cart.concat(action.payload),
                error: ""
            }   
        default : 
            return state;     
    }
}