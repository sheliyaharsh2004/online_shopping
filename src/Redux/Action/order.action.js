import axios from 'axios'
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc  } from 'firebase/firestore'
import storage, { db } from '../../Firebase'
import * as ActionTypes from '../ActionType'


export const getOrder = () => async (dispatch) => {
    try {
        dispatch(loadingMedicines())

        const querySnapshot = await getDocs(collection(db, "Order"));
        let dataD = [];
        querySnapshot.forEach((doc) => {
            dataD.push({id: doc.id, ...doc.data()})
        });
        dispatch({type : ActionTypes.GET_ORDER, payload : dataD});

    } catch(error) {
        dispatch(errorMedicines(error.message))
    }
}

export const postOrder = (data) => async (dispatch) => {
    try {
        dispatch(loadingMedicines())

        const docRef = await addDoc(collection(db, "Order"), {
            Order: data.cartDetails,
            User: data.userDetails,
        });

        dispatch({type : ActionTypes.POST_ORDER, payload : docRef})

    } catch(error) {
        dispatch(errorMedicines(error.message))
    }
}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type : ActionTypes.LOADING_MEDICINES })
}

export const errorMedicines = (error) => (dispatch) => {
    dispatch({ type : ActionTypes.ERROR_MEDICINES, payload : error })
}