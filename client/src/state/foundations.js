import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFoundations = createAsyncThunk("PETS", ()=>{
    return axios.get('/api/foundation').then((foundations)=>foundations.data)
})

export const getFoundation = createAsyncThunk("PETS", (input)=>{
    return axios.get(`/api/foundation/${input}`).then((foundations)=>foundations.data)
})

const foundationsReducer = createReducer({},{
    [getAllFoundations.fulfilled]: (state, action) => action.payload,
    [getFoundation.fulfilled]: (state, action) => action.payload,
})

export default foundationsReducer;