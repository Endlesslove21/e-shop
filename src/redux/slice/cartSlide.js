import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, actions) {
      console.log(actions.payload);
    },
  },
});

export const { ADD_TO_CART } = cartSlide.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export default cartSlide.reducer;
