import { configureStore } from "@reduxjs/toolkit";

import { thunk } from "redux-thunk";
import logger from "redux-logger";

import { product1Reducer } from "./ReduxActions/Reducer";
import { AddCart } from "./ReduxActions/Addcart/AddCardReducer";
import addCardItem from "./ReduxActions/Slicer";
import addProduct from "./ReduxActions/AddProductSlicer";


export const store = configureStore({
  reducer: {
    addItem: addCardItem,
    product1: product1Reducer,
    addCart: AddCart,
    addProductItems: addProduct
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});
