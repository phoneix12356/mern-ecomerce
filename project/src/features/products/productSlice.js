import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
  },
  reducers: {
    productData: (state, action) => {
      state.product = action.payload;
    },
  },
});
export const { productData } = productSlice.actions;
export default productSlice.reducer;
