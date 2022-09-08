import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import Pets from './components/Pets'
import Foundations from './components/Foundations'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Navbar from './commons/Navbar'
import History from './components/History';
import Profile from './components/Profile';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navbar prop={<Home/>}/>}/>
        <Route path='/profile' element={<Navbar prop={<Profile/>}/>}/>
        <Route path='/history' element={<Navbar prop={<History/>}/>}/>
        <Route path='/pets' element={<Navbar prop={<Pets/>}/>}/>
        <Route path='/fundations' element={<Navbar prop={<Foundations/>}/>}/>
        <Route path='/pet/:petName' element={<Navbar prop={<></>}/>}/>
        <Route path='/foundation/:fundationName' element={<Navbar prop={<></>}/>}/>
        <Route path='/login' element={<Navbar prop={<LogIn/>}/>}/>
        <Route path='/register' element={<Navbar prop={<SignUp/>}/>}/>
        <Route path='/favorites' element={<Navbar prop={<></>}/>}/>
        <Route path='/messages' element={<Navbar prop={<></>}/>}/>
        <Route path='/search' element={<Navbar prop={<></>}/>}/>
      </Routes>
  );
}

export default App;
