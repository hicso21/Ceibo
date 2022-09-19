import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; 

export const getAllPets = createAsyncThunk("ALLPETS", ()=>{
    return axios.get('http://localhost:3001/api/pets/all').then(res=>res.data)
})

export const search = createAsyncThunk('SEARCH', (input)=>{
    return axios.get(`http://localhost:3001/api/pets/search/avanzada?search=${input}`).then(res=>res.data)
} )

export const searchByGender = createAsyncThunk('SEARCHBYGENDER', (input)=>{
    return axios.get(`http://localhost:3001/api/pets/search/genero/${input}`).then(res=>res.data)
} )

export const searchBySpecie = createAsyncThunk('SEARCHBYSPECIE', (input)=>{
    return axios.get(`http://localhost:3001/api/pets/search/specie/${input}`).then(res=>res.data)
} )

export const searchBySize = createAsyncThunk('SEARCHBYSIZE', (input)=>{
    return axios.get(`http://localhost:3001/api/pets/search/size/${input}`).then(res=>res.data)
} )

const searchReducer = createReducer([], {
    [search.fulfilled]: (state, action) => action.payload,
    [searchByGender.fulfilled]: (state, action) => action.payload,
    [searchBySize.fulfilled]: (state, action) => action.payload,
    [searchBySpecie.fulfilled]: (state, action) => action.payload,
    [getAllPets.fulfilled]: (state, action) => action.payload,
})

export default searchReducer