import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../constants";
import { toast } from "react-toastify";


export const register = createAsyncThunk('register/registerUser', async (values) => {
    const response = await axios.post('https://dummyjson.com/users/add', values, { headers })
    console.log(response.data)
    return response.data
})


export const RegisterSlice = createSlice({
    name: 'register',
    initialState: { newUserData: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.newUserData = action.payload
            state.error = ''
            toast.success('Signed Up successfully', { position: 'top-center' })

        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.newUserData = []
            state.error = 'Incorrect username or password'
        })
    }
})

export default RegisterSlice.reducer
