import { createReducer, createSlice } from "@reduxjs/toolkit";
import { ERROR_DATA, REQUEST_DATA, SUCCESS_DATA } from "./ActionType";

const initialData = {
  homeProducts: [],
  errors: null,
  loading: false,
};

export const product1Reducer = (state = initialData, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        loading: true,
      };
    case ERROR_DATA:
      return {
        ...state,
        errors: action.payload,
        homeProducts: [],
        loading: false,
      };
    case SUCCESS_DATA:
      return {
        ...state,
        errors: null,
        loading: false,
        homeProducts: action.payload,
      };
    default:
      return state;
  }
};
