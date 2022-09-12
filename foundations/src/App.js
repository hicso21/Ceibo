import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./commons/Navbar";
import SingularPet from "./components/SingularPet";
import Profile from "./components/Profile";
import History from "./components/History";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Pets from "./components/Pets";

function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Navbar prop={<Profile/>}/>}/>
      <Route path="/history" element={<Navbar prop={<History/>}/>}/>
      <Route path="/mascotas" element={<Navbar prop={<Pets/>}/>}/>
      <Route path="/mascotas/:petName" element={<Navbar prop={<SingularPet/>}/>}/>
      <Route path="/login" element={<Navbar prop={<LogIn/>}/>}/>
      <Route path="/" element={<Navbar prop={<SignUp/>}/>}/>
      <Route path="/messages" element={<Navbar prop={<></>}/>}/>
      <Route path="/add" element={<Navbar prop={<></>}/>}/>
      <Route path="/search" element={<Navbar prop={<></>}/>}/>
    </Routes>
  )
}

export default App;
