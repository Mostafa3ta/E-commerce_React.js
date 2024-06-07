import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = { products: [], loading: false }


export const getProducts = createAsyncThunk('products/getProducts', async (page) => {
    const response = await axios.get(`https://dummyjson.com/products?limit=24&skip=${page * 24}`)
    // console.log(response);
    return response.data
})


export const ProductSlice = createSlice({
    name: 'products',
    initialState: { products: [], loading: false, error: null },
    reducers: {
        printProducts: (state, action) => {
            console.log(state.products);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
    }
})

export default ProductSlice.reducer
export const { printProducts } = ProductSlice.actions
