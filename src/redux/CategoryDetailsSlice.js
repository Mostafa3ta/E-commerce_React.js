import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryDetails = createAsyncThunk('Category/details', async (category) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`)
    return response.data
})

const CategoryDetailsSlice = createSlice({
    name: 'CategoryDetails',
    initialState: { categoryDetails: [], error: null, loading: false },
    extraReducers: (builder) => {
        builder.addCase(getCategoryDetails.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCategoryDetails.fulfilled, (state, action) => {
            state.loading = false
            state.categoryDetails = action.payload
            state.error = ''
        })
        builder.addCase(getCategoryDetails.rejected, (state, action) => {
            state.loading = false
            state.categoryDetails = []
            state.error = 'something went wrong'
        })
    }
})

export default CategoryDetailsSlice.reducer