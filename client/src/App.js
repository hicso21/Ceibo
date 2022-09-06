import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>

      <Routes>
        <Route path='/user' element={''}/>
        <Route path='/pets' element={''}/>
        <Route path='/pet-profile' element={''}/>
        <Route path='/fundations' element={''}/>
        <Route path='/fundation-profile' element={''}/>
        <Route path='/login' element={''}/>
        <Route path='/register' element={''}/>
      </Routes>
    </>
  );
}

export default App;
