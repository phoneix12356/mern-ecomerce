import {createSlice} from "@reduxjs/toolkit";


const productSlice = createSlice({
  name : 'products',
  initialState : {
    product : [],
  },
  reducers:{
   productData : (state,action)=>{
     
     state.product = action.payload; 
     console.log("productSlice ke reducer ke andar productData ke andar " , state.product);
   }
  }
})
export const {productData} = productSlice.actions;
export default productSlice.reducer;