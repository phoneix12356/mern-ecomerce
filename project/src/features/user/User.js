import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://mern-ecomerce-5tzn.onrender.com";
export const fetchUserDetail = createAsyncThunk(
  "user/fetchUserDetailsFromBackend",
  async () => {
    const res = await axios.get(`${API_URL}/api/profile`);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    email: "",
    password: "",
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.status = "successful";
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
      })
      .addCase(fetchUserDetail.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default userSlice.reducer;
