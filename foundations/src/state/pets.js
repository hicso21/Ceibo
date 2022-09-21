import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPets = createAsyncThunk("PETS", (user) => {
  return axios
              .get(
                `http://localhost:3001/api/foundation/${user._id}/pets`,
                {withCredentials: true, credentials: "include"})
              .then((pets) => pets.data)
              .catch((err)=> console.log(err))
});

export const getPetsByFoundation = createAsyncThunk("PETS", (input) => {
  return axios
              .get(
                `http://localhost:3001/api/pets/${input}`,
                {withCredentials: true, credentials: "include"})
              .then((pets) => pets.data)
              .catch((err)=> console.log(err))
});

export const getOnePet = createAsyncThunk("PET", (petId) => {
  return axios
              .get(
                `http://localhost:3001/api/pets/${petId}`,
                {withCredentials: true, credentials: "include"})
              .then((pets) =>[pets.data])
              .catch((err)=> console.log(err))
});

const petsReducer = createReducer(
  [],
  {
    [getAllPets.fulfilled]: (state, action) => action.payload,
    [getPetsByFoundation.fulfilled]: (state, action) => action.payload,
    [getOnePet.fulfilled]: (state, action) => action.payload,
  }
);

export default petsReducer;
