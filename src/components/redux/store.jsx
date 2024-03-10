import { combineReducers } from "redux";
import goodsReducer from "./goodsReducer";
import { thunk } from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterReducer";

let reducers = combineReducers({
    goodsPage: goodsReducer,
    fieldsPage: filterReducer
});

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk
    })
});

export default store;