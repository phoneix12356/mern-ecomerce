import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
  name: "page",
  initialState: {
    currentPage: 1,
  },
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changePage } = PageSlice.actions;
export default PageSlice.reducer;