import * as ActionType from '../ActionType'

export const addcartaction = (data) => (dispatch) => {
    dispatch({type:ActionType.CART_ADD_DATA, payload:data})
}

export const getcartaction = () => (dispatch) => {
    dispatch({type:ActionType.CART_GET_DATA})
}