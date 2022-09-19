import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home'
import Pets from './components/Pets'
import AdoptionForm from './components/AdoptionForm'
import ThanksAdoption from './components/ThanksAdoption'
import Foundations from './components/Foundations'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Navbar from './commons/Navbar'
import History from './components/History';
import Profile from './components/Profile';
import Favorites from './components/Favorites';
import SingularPet from './components/SingularPet';
import SingularFoundation from './components/SingularFoundation';
import Chat from './components/Chat/Chat.jsx';
import Search from './components/Search';
import axios from'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './state/user';

function App() {
  const dispatch = useDispatch()
  const {pathname} = useLocation()

  useEffect(()=>{
    if(pathname === '/register' || pathname === '/login'){}
    else{
      axios
      .get("http://localhost:3001/api/user/me", {
        withCredentials: true,
        credentials: "include",
      })
      .then((resp) => {
        dispatch(setUser(resp.data));
        return resp.data;
      })
    }
  },[])

  return (
      <Routes>
        <Route path='/' element={<Navbar prop={<Home/>}/>}/>
        <Route path='/profile' element={<Navbar prop={<Profile/>}/>}/>
        <Route path='/history' element={<Navbar prop={<History/>}/>}/>
        <Route path='/mascotas' element={<Navbar prop={<Pets/>}/>}/>
        <Route path='/adoptionForm' element={<Navbar prop={<AdoptionForm/>}/>}/>
        <Route path='/thanksAdoption' element={<Navbar prop={<ThanksAdoption/>}/>}/>
        <Route path='/fundaciones' element={<Navbar prop={<Foundations/>}/>}/>
        <Route path='/mascotas/:petId' element={<Navbar prop={<SingularPet/>}/>}/>
        <Route path='/fundaciones/:foundationName' element={<Navbar prop={<SingularFoundation/>}/>}/>
        <Route path='/login' element={<Navbar prop={<LogIn/>}/>}/>
        <Route path='/register' element={<Navbar prop={<SignUp/>}/>}/>
        <Route path='/favorites' element={<Navbar prop={<Favorites/>}/>}/>
        <Route path='/messages' element={<Navbar prop={<Chat/>}/>}/>
        <Route path='/search' element={<Navbar prop={<Search/>}/>}/>
        <Route path='/chat' element={<Navbar prop={<Chat/>}/>}/>
      </Routes>
  );
}

export default App;
