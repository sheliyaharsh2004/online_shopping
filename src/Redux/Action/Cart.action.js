import * as ActionType from '../ActionType'

export const addcartaction = (data) => (dispatch) => {
    dispatch({type: ActionType.CART_ADD_DATA, payload: data})
}

export const getcartaction = () => (dispatch) => {
    dispatch({type:ActionType.CART_GET_DATA})
}

export const deletecart = (data) => (dispatch) => {
    dispatch({ type: ActionType.CART_DELETE_DATA, payload: data })
}

export const increment = (id) => (dispatch) =>{
    console.log(id);
    dispatch ({type : ActionType.INCREMENTED, payload: id})
}

export const decrement = (id) => (dispatch) =>{
    dispatch ({type : ActionType.DECREMENTED, payload: id})
}