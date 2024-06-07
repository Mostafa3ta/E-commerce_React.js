import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../constants";
import { toast } from "react-toastify";


export const login = createAsyncThunk('login/loginUser', async (values) => {
    const response = await axios.post('https://dummyjson.com/auth/login', values, { headers })
    console.log(response.data)
    return response.data
})


export const LoginSlice = createSlice({
    name: 'login',
    initialState: { userData: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.userData = action.payload
            state.error = ''
            localStorage.setItem('dataToken', action.payload.token)
            localStorage.setItem('userId', JSON.stringify(action.payload.id))
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            toast.success(`Welcome! ${action.payload?.firstName} `, {
                position: 'top-center'
            })

        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.userData = []
            state.error = 'Incorrect username or password'
            toast.error(`Sorry, please try again`, {
                position: 'top-center'
            })
        })
    }
})

export default LoginSlice.reducer
