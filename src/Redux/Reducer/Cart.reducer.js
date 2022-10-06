import * as ActionType from '../ActionType'

const initalstate = {
    isLoading: false,
    cart: [],
    error: "",
}

export const Cartreducer  = (state=initalstate , action) => {
    // console.log("action.payload", action.payload, action.type, state);
    switch (action.type) {
        case ActionType.CART_GET_DATA :
            return {
                ...state,
                isLoading: false,
                error: ""
            }
        case ActionType.CART_ADD_DATA :
            const Data = state.cart.find((c) => c.id === action.payload.id);
            if(Data){
                Data.quantity++;
            } else {
                state.cart.push(action.payload);
            }
            return {
                ...state,
                isLoading: false,
                error: ""
            } 
        case ActionType.CART_DELETE_DATA : 
            return {
                ...state,
                isLoding : false,
                cart : state.cart.filter((d, i ) => d.id !== action.payload),
                error : ''
            }
        case ActionType.INCREMENTED :
            return {
                ...state,
                isLoading: false,
                cart : state.cart.map((c) => {
                    console.log(c);
                    if(c.id === action.payload){
                        return { id: c.id,
                            quantity: c.quantity + 1
                        }
                    } else{
                        return c;
                    }
                }),
                error: ""
            }
        case ActionType.DECREMENTED : 
            return {
                ...state,
                isLoding : false,
                cart : state.cart.map((c) => {
                    if(c.id === action.payload){
                        return { id: c.id,
                            quantity: c.quantity - 1
                        }
                    } else{
                        return c;
                    }
                }),
                error : ''
            }
        default : 
            return state;     
    }
}