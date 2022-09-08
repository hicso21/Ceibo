import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPets = createAsyncThunk("PETS", ()=>{
    return axios.get('/api/pets/all').then((pets)=>pets.data)
})

export const getPetsByFundation = createAsyncThunk("PETS", (input)=>{
    return axios.get(`/api/pets/${input}`).then((pets)=>pets.data)
})

const petsReducer = createReducer({},{
    [getAllPets.fulfilled]: (state, action) => action.payload,
    [getPetsByFundation.fulfilled]: (state, action) => action.payload,
})

export default petsReducer;