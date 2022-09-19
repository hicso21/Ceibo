import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./commons/Navbar";
import SingularPet from "./components/SingularPet";
import Profile from "./components/Profile";
import History from "./components/History";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Pets from "./components/Pets";
import AddPet from "./components/AddPet";
import Search from "./components/Search";
import Layout from "./components/Layout"
import Chat from "./components/Chat/Chat"

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/mascotas" element={<Pets/>}/>
          <Route path="/mascotas/:petId" element={<SingularPet/>}/>
          <Route path="/" element={<LogIn/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/passwordForgotted" element={<AddPet/>}/>
          <Route path="/messages" element={<AddPet/>}/>
          <Route path="/add" element={<AddPet/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
