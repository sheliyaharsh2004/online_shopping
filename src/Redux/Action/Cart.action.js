import * as ActionType from '../ActionType'

export const addcartaction = (data) => (dispatch) => {
    dispatch({type:ActionType.CART_ADD_DATA, payload:data})
}

export const getcartaction = () => (dispatch) => {
    dispatch({type:ActionType.CART_GET_DATA})
}

export const deletecart = (data) => (dispatch) => {
    dispatch({ type: ActionType.CART_DELETE_DATA, payload: data })
}

export const increment = () => (dispatch) =>{
    dispatch ({type : ActionType.INCREMENTED})
}

export const decrement = () => (dispatch) =>{
    dispatch ({type : ActionType.DECREMENTED})
}