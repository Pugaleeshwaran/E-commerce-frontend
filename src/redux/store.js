import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice"
import checkoutReducer from "./checkoutSlice"
import orderReducer from "./orderSlice"
import adminReducer from "./adminSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        order: orderReducer,
        admin: adminReducer,
    },
});

export default store;