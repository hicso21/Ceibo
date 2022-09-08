import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getId = createAsyncThunk("ID", (type, id)=>{
    return axios.get(`http://localhost:3001/api/${type}/${id}`).then(info=>info.data[0])
})

export const eraseId = createAsyncThunk("ERASE_ID", ()=>{
    return null
})

const idReducer = createReducer({},{
    [getId.fulfilled]: (state, action)=> action.payload,
    [eraseId.fulfilled]: (state, action)=> action.payload,
})

export default idReducer