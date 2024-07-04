import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../../data";
import {
  fetchDataByUserId,
  AddDataToUserCart,
  UpdateCartDataInUserCart,
  DeleteCartItemInUserCart,
} from "./Cartapi";

const initialState = {
  username: "",
  productList: [],
  cartSize: 0,
  status: "idle",
  error: null,
};

export const fetchUserCart = createAsyncThunk(
  "userCartStatus/fetchbyid",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchDataByUserId();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddItemToUserCart = createAsyncThunk(
  "AddItemToUserCartDataBase/AddToUserCartById",
  async (user, { rejectWithValue }) => {
    try {
      const { pid, quantity } = user;
      const response = await AddDataToUserCart({ pid, quantity });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const UpdateItemToUserCart = createAsyncThunk(
  "UpdateItemToUserCartDataBase/UpdateToUserCartById",
  async (user, { rejectWithValue }) => {
    try {
      const { pid, quantity } = user;
      const response = await UpdateCartDataInUserCart({
        pid: pid,
        quantity: quantity,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteItemofUserCart = createAsyncThunk(
  "DelteItem/DeleteOfUserCartById",
  async (user, { rejectWithValue }) => {
    try {
      const { pid } = user;
      const response = await DeleteCartItemInUserCart(pid);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    UpdateUserName: (state, action) => {
      state.username = action.payload.username;
    },
    EmptyProductList: (state) => {
      state.productList = [];
      state.cartSize = 0;
    },
    NumberOfItemInCart: (state, action) => {
      state.cartSize = Number(action.payload.cartSize) || 0;
    },
    updateCartSize: (state) => {
      state.cartSize = state.productList.reduce(
        (total, item) => total + (Number(item.amount) || 0),
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        let list = [];
        let arr = action.payload ? action.payload : [];
       
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (data[i].id === Number(arr[j].productid)) {
              let item = { ...data[i], amount: Number(arr[j].quantity) || 0 };
              list.push(item);
            }
          }
        }
        state.productList = list;
        cartSlice.caseReducers.updateCartSize(state);
        state.status = "Succeeded";
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(AddItemToUserCart.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(AddItemToUserCart.fulfilled, (state, action) => {
        state.status = "Succeeded";
        if (action.payload) {
          state.productList.push({
            ...action.payload,
            amount: Number(action.payload.quantity) || 0,
          });
          cartSlice.caseReducers.updateCartSize(state);
        } else {
          console.error('AddItemToUserCart fulfilled with invalid payload:', action.payload);
        }
      })
      .addCase(AddItemToUserCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(UpdateItemToUserCart.fulfilled, (state, action) => {
        state.status = "Succeeded";
        if (action.payload && action.payload.pid !== undefined) {
          const index = state.productList.findIndex(
            (item) => item.id === action.payload.pid
          );
          if (index !== -1) {
            state.productList[index] = {
              ...state.productList[index],
              amount: Number(action.payload.quantity) || 0,
            };
          }
          cartSlice.caseReducers.updateCartSize(state);
        } else {
          console.error('UpdateItemToUserCart fulfilled with invalid payload:', action.payload);
        }
      })
      .addCase(UpdateItemToUserCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(DeleteItemofUserCart.fulfilled, (state, action) => {
        state.status = "Succeeded";
        if (action.payload && action.payload.id !== undefined) {
          state.productList = state.productList.filter(
            (item) => item.id !== action.payload.id
          );
          cartSlice.caseReducers.updateCartSize(state);
        } else {
          console.error('DeleteItemofUserCart fulfilled with invalid payload:', action.payload);
        }
      })
      .addCase(DeleteItemofUserCart.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(DeleteItemofUserCart.pending, (state) => {
        state.status = "Loading";
      });
  },
});

export const { UpdateUserName, EmptyProductList, NumberOfItemInCart , updateCartSize } =
  cartSlice.actions;
export default cartSlice.reducer;