import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    addProductData: [],
    loading: false,
    error: null,
};

export const addProduct = createSlice({
    name: "addProduct",
    initialState,
    reducers: {
        AddProducts: (state, action) => {
            const actionItems = {
                ...action.payload,
            }
            state.addProductData.push(actionItems)

        },
        RemoveProducts: (state, action) => {
            const id = action.payload
            return {
                ...state,
                addProductData: state.addProductData.filter(item => item?.id !== id)
            }

        },
        RemoveAll: (state) => {
            state.addProductData = []
        }
    },
});

export const { AddProducts, RemoveProducts } = addProduct.actions;
export default addProduct.reducer;

// homeProductSlice