import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import productReducer from "../redux/slice/productSlide";
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
