import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFoundations = createAsyncThunk("FOUNDATIONS_ALL", ()=>{
    return axios.get('http://localhost:3001/api/foundation').then((foundations)=>foundations.data)
})

export const getFoundation = createAsyncThunk("FOUNDATIONS", (input)=>{
    return axios.get(`http://localhost:3001/api/foundation/${input}`).then((foundations)=>foundations.data)
})

const foundationsReducer = createReducer({},{
    [getAllFoundations.fulfilled]: (state, action) => action.payload,
    [getFoundation.fulfilled]: (state, action) => action.payload,
})

export default foundationsReducer;