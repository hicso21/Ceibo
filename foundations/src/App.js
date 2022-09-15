import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./commons/Navbar";
import SingularPet from "./components/SingularPet";
import Profile from "./components/Profile";
import History from "./components/History";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Pets from "./components/Pets";
import AddPet from "./components/AddPet";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/user";
import axios from "axios";

function App() {
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const user = useSelector((state)=>state.user)
  console.log(user)

  useEffect(()=>{
    console.log(pathname)
    if(pathname !== '/' && pathname !== '/register'){
    axios
    .get("http://localhost:3001/api/foundation/me", {
      withCredentials: true,
      credentials: "include",
    })
    .then((resp) => {
      dispatch(setUser(resp.data));
      return resp.data;
    })}
  },[])

  return (
    <Routes>
      <Route path="/profile" element={<Navbar prop={<Profile/>}/>}/>
      <Route path="/history" element={<Navbar prop={<History/>}/>}/>
      <Route path="/mascotas" element={<Navbar prop={<Pets/>}/>}/>
      <Route path="/mascotas/:petId" element={<Navbar prop={<SingularPet/>}/>}/>
      <Route path="/" element={<Navbar prop={<LogIn/>}/>}/>
      <Route path="/register" element={<Navbar prop={<SignUp/>}/>}/>
      {/* <Route path="/passwordForgotted" element={<Navbar prop={<></>}/>}/> */}
      <Route path="/messages" element={<Navbar prop={<></>}/>}/>
      <Route path="/add" element={<Navbar prop={<AddPet/>}/>}/>
      <Route path="/search" element={<Navbar prop={<></>}/>}/>
    </Routes>
  )
}

export default App;
