import axios from "axios"
import { ERROR_DATA, REQUEST_DATA, SUCCESS_DATA } from "./ActionType"


export const fromRequest = () => {
    return {
        type: REQUEST_DATA
    }
}
export const fromError = (error) => {
    return {
        type: ERROR_DATA,
        payload: error
    }
}
export const fromData = (data) => {
    return {
        type: SUCCESS_DATA,
        payload: data
    }
}


export const ProductFetchedData = () => {
    return async (dispatch) => {
        dispatch(fromRequest())
        try {
            const response = await axios.get('https://dummyjson.com/products');  // Replace with your API URL
            dispatch(fromData(response.data));  // Dispatch success action with data
        } catch (error) {
            dispatch(fromError(error.message));  // Dispatch error action with error message
        }
    }
}