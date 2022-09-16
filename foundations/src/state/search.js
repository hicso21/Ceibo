import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"; 

export const search = createAsyncThunk('SEARCH', (input)=>{
    return axios.get(`http://localhost:3001/api/pets/search/avanzada?search=${input}`).then(res=>res.data)
} )

const searchReducer = createReducer([], {
    [search.fulfilled]: (state, action) => action.payload,
})

export default searchReducer