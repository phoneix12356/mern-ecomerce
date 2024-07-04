import { createSlice } from "@reduxjs/toolkit";

const DarkMode = createSlice({
  name: "mode",
  initialState: {
    darkMode: 1,
  },
  reducers: {
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { changeMode } = DarkMode.actions;
export default DarkMode.reducer;
