import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './commons/Home'
import Pets from './components/Pets'
import Foundations from './components/Foundations'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user' element={''}/>
        <Route path='/pets' element={<Pets/>}/>
        <Route path='/foundations' element={<Foundations/>}/>
        <Route path='/pet-profile' element={''}/>
        <Route path='/foundation-profile' element={''}/>
        <Route path='/login' element={''}/>
        <Route path='/register' element={''}/>
        <Route path='/search/:word' element={''}/>
      </Routes>
    </>
  );
}

export default App;
