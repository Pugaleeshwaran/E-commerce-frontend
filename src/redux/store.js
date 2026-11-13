import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice"
import checkoutReducer from "./checkoutSlice"
import orderReducer from "./orderSlice"
import adminReducer from "./adminSlice"
import adminProductReducer from "./adminProductSlice"
import adminOrderReducer from './adminOrderSlice'
// console.log("orderReducer:", orderReducer);
const store = configureStore({

    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
        admin: adminReducer,
        adminProduct: adminProductReducer,
        adminOrder: adminOrderReducer,
    },
});
// console.log("state:", store.getState());
export default store;