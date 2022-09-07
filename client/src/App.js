import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import Pets from './components/Pets'
import Foundations from './components/Foundations'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Navbar from './commons/Navbar'
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navbar prop={<Home/>}/>}/>
        <Route path='/profile' element={<Navbar prop={<Pets/>}/>}/>
        <Route path='/pets' element={<Navbar prop={<Pets/>}/>}/>
        <Route path='/fundations' element={<Navbar prop={<Foundations/>}/>}/>
        <Route path='/pet-profile' element={<Navbar prop={<></>}/>}/>
        <Route path='/foundation-profile' element={<Navbar prop={<></>}/>}/>
        <Route path='/login' element={<Navbar prop={<LogIn/>}/>}/>
        <Route path='/register' element={<Navbar prop={<SignUp/>}/>}/>
        <Route path='/search/:word' element={<Navbar prop={<></>}/>}/>
      </Routes>
  );
}

export default App;
