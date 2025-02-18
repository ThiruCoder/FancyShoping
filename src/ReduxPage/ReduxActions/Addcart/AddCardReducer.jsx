import { GET_DATA, UPDATE_DATA } from "../ActionType"


const initialState = {
    cart_data: []
}

export const AddCart = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                cart_data: action.payload
            }
        case UPDATE_DATA:
            return {
                ...state,
                cart_data: action.payload
            }
        default:
            return state
    }
}

