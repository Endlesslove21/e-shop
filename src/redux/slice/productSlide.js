import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      console.log(action.payload);
      state.products = action.payload.products;
    },
  },
});

export const { STORE_PRODUCTS } = productSlide.actions;
export const selectedProducts = (state) => state.product.products;
export default productSlide.reducer;
