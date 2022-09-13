import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const sendLoginRequest = createAsyncThunk("LOGIN", (input) => {
  return axios.post("http://localhost:3001/api/user/login",input).then((r)=> r.data)
});

export const sendSignUpRequest = createAsyncThunk("SIGNUP", (input) => {
  return axios.post("http://localhost:3001/api/user/register",input).then((r)=> r.data)
 });

export const sendLogoutRequest = createAsyncThunk("LOGOUT", () => {
  return axios.post("http://localhost:3001/api/user/logout").then((r)=> r)
 });

export const setUser = createAsyncThunk("SETUSER", (input) => {
  return input;
});


//const user = JSON.parse(window.localStorage.getItem("user"))

const userReducer = createReducer({}, {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fulfilled]: (state, action) => action.payload,
  [sendSignUpRequest.fulfilled]: (state, action) => action.payload,
  [setUser.fulfilled]: (state, action) => action.payload,
});

export default userReducer;