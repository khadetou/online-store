import { combineReducers } from "@reduxjs/toolkit";
import ProductReducer from "./products/productSlice";
import AuthReducer from "./auth/index";
import OrderReducer from "./order/index";
const reducers = combineReducers({
  auth: AuthReducer,
  products: ProductReducer,
  orders: OrderReducer,
});

export default reducers;
