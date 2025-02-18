import { createSlice } from "@reduxjs/toolkit";
import { get, push, ref, remove, update } from "firebase/database";
import { database } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const initialState = {
  dataProduct1: [],
  loading: false,
  error: null,
};

export const addCardItem = createSlice({
  name: "product",
  initialState,
  reducers: {
    DataStored: (state, action) => {
      const actionItems = {
        ...action.payload,
      }
      if (actionItems && Object.keys(actionItems).length > 0) {
        state.dataProduct1.push(actionItems)
      }
    },
    RemoveItemFromStore: (state, action) => {
      const id = action.payload
      return {
        ...state,
        dataProduct1: state.dataProduct1.filter(item => item?.id !== id)
      }

    },
    RemoveAll: (state) => {
      state.dataProduct1 = []
    },
    incQuantity: (state, action) => {
      const id = action.payload
      const amount = 1
      state.dataProduct1 = state.dataProduct1.map(item =>
        Number(item.id) === Number(id) ? { ...item, quantity: item.quantity + amount } : item
      );
    },
    decQuantity: (state, action) => {
      const id = action.payload
      const amount = 1
      state.dataProduct1 = state.dataProduct1.map(item =>
        Number(item.id) === Number(id) ? { ...item, quantity: item.quantity - amount } : item
      );
    }
  },
});

export const { DataStored, RemoveItemFromStore, RemoveAll, incQuantity, decQuantity } = addCardItem.actions;
export default addCardItem.reducer;

// homeProductSlice