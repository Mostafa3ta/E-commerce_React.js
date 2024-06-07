import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk('category/getCategories', async () => {
    let response = await axios.get(`https://dummyjson.com/products/categories`)
    return response.data
})

const categorySlice = createSlice({
    name: 'category',
    initialState: { categories: [], loading: false, },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
        })
    }
})

export default categorySlice.reducer