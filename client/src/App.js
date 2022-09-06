import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './commons/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user' element={''}/>
        <Route path='/pets' element={''}/>
        <Route path='/fundations' element={''}/>
        <Route path='/pet-profile' element={''}/>
        <Route path='/fundation-profile' element={''}/>
        <Route path='/login' element={''}/>
        <Route path='/register' element={''}/>
        <Route path='/search/:word' element={''}/>
      </Routes>
    </>
  );
}

export default App;
