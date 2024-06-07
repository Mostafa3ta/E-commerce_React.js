import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk('product/details', async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    return response.data
})

const ProductDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: { productDetails: [], error: null, loading: false, finalPrice: 0 },
    reducers: {
        calcPrice: (state, action) => {
            state.finalPrice = (action.payload.price - (action.payload.price * action.payload.discountPercentage / 100))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetails.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getProductDetails.fulfilled, (state, action) => {
            state.loading = false
            state.productDetails = action.payload
            state.error = ''
        })
        builder.addCase(getProductDetails.rejected, (state, action) => {
            state.loading = false
            state.productDetails = []
            state.error = 'something went wrong'
        })
    }
})

export default ProductDetailsSlice.reducer
export const { calcPrice } = ProductDetailsSlice.actions