import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getPetsByFoundation = createAsyncThunk("PETS", (foundationId)=>{
    return axios
                .get(
                    `http://localhost:3001/api/foundation/${foundationId}/pets`,
                    { withCredentials: true, credentials: 'include' })
                .then((pets)=>pets.data)
                .catch((err)=> console.log(err))
})

export const getOnePet = createAsyncThunk("PET", (petId)=>{
    return axios
                .get(
                    `http://localhost:3001/api/pets/${petId}`,
                    { withCredentials: true, credentials: 'include' })
                .then((pets)=>{return [pets.data]})
                .catch((err)=> console.log(err))
})

const petsReducer = createReducer([],{
    [getPetsByFoundation.fulfilled]: (state, action) => action.payload,
    [getOnePet.fulfilled]: (state, action) => action.payload,
})

export default petsReducer;