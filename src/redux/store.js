import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import productReducer from "../redux/slice/productSlide";
import filterReducer from "../redux/slice/filterSlice";
import cartReducer from "../redux/slice/cartSlide";
import checkoutReducer from "../redux/slice/checkoutSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
