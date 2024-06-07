import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductSearch = createAsyncThunk('product/Search', async (value) => {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${value}`)
    return response.data
})

const ProductSearchSlice = createSlice({
    name: 'productSearch',
    initialState: { productSearch: [], error: null, loading: false },
    extraReducers: (builder) => {
        builder.addCase(getProductSearch.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getProductSearch.fulfilled, (state, action) => {
            state.loading = false
            state.productSearch = action.payload
            state.error = ''
        })
        builder.addCase(getProductSearch.rejected, (state, action) => {
            state.loading = false
            state.productSearch = []
            state.error = 'something went wrong'
        })
    }
})

export default ProductSearchSlice.reducer