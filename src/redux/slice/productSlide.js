import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      console.log(action.payload);
      state.products = action.payload.products;
    },
    GET_PRICE_RANGE(state, action) {
      const { products } = action.payload;
      const arr = [];
      products.map((product) => {
        const price = product.price;
        return arr.push(price);
      });
      const sortedArr = arr.sort((a, b) => a - b);
      console.log(sortedArr);
      state.minPrice = sortedArr[0];
      state.maxPrice = sortedArr[sortedArr.length - 1];
    },
  },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlide.actions;
export const selectedProducts = (state) => state.product.products;
export const selectedMinPrice = (state) => state.product.minPrice;
export const selectedMaxPrice = (state) => state.product.maxPrice;
export default productSlide.reducer;
