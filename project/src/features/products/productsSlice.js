import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://mern-ecomerce-5tzn.onrender.com";

export const AsyncFetchAllProducts = createAsyncThunk(
  "productsData/AsyncFetching",
  async () => {
    const resp = await axios.get(`${API_URL}/data/api/products`);
    return resp.data;
  }
);

const AllproductSlice = createSlice({
  name: "productsData",
  initialState: {
    List: [],
    status: "Idle",
  },
  reducers: {
    AddproductsData: (state, action) => {
      state.List = [...action.payload.products];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncFetchAllProducts.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(AsyncFetchAllProducts.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.List = [...action.payload];
      })
      .addCase(AsyncFetchAllProducts.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export const { AddproductsData } = AllproductSlice.actions;
export default AllproductSlice.reducer;
