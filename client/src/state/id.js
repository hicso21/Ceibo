import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getId = createAsyncThunk("ID", (data)=>{
    return axios.get(`http://localhost:3001/api/${data.type}/${data.id}`).then(info=>info.data)
})

const idReducer = createReducer([],{
    [getId.fulfilled]: (state, action)=> action.payload,
})

export default idReducer