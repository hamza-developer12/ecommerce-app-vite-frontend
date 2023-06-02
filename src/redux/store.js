import { configureStore } from "@reduxjs/toolkit";
import getAllProductsSlice from "./api/products/getAllProducts";
import productsByCategory from "./api/products/productsByCategory";
import singleProduct from "./api/products/singleProduct";
import loginApiSlice from "./api/user/loginApiSlice";
import registerApiSlice from "./api/user/registerApiSlice";
import loginStatusSlice from "./api/user/loginStatusSlice";
import cartSlice from "./features/cartSlice";
export const store = configureStore({
  devTools: false,
  reducer: {
    getAllProducts: getAllProductsSlice,
    getByCategory: productsByCategory,
    singleProduct: singleProduct,
    userLogin: loginApiSlice,
    registerUser: registerApiSlice,
    logStatus: loginStatusSlice,
    cartSlice: cartSlice,
  },
});
