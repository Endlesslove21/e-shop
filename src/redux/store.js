import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import productReducer from "../redux/slice/productSlide";
import filterReducer from "../redux/slice/filterSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
