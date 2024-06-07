import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import CategoryReducer from "./CategorySlice";
import LoginReducer from "./LoginSlice";
import ProductDetailsReducer from "./ProductDetailsSlice";
import categoryDetailsReducer from "./CategoryDetailsSlice";
import registerReducer from "./RegisterSlice";
import SearchReducer from "./SearchSlice";
import CartReducer from "./CartSlice";
import FavReducer from "./FavSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: ProductDetailsReducer,
        categoryDetails: categoryDetailsReducer,
        category: CategoryReducer,
        productSearch: SearchReducer,
        register: registerReducer,
        login: LoginReducer,
        cart: CartReducer,
        favourite: FavReducer,
    }
})