import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/CartSlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/user/User";
import productsReducer from "../features/products/productsSlice";
import modeReducer from "../features/mode/DarkModeSlice"; 
import PageReducer from "../features/page/Page";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
    products: productsReducer,
    mode: modeReducer, 
    page: PageReducer
  },
});
