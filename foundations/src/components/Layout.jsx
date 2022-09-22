import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Footer from '../commons/Footer';
import Navbar from '../commons/Navbar';
import { setUser } from '../state/user';

const Layout = ({ children }) => {

    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const user = useSelector((state)=>state.user)
  
    useEffect(()=>{
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
    <>
        <Navbar prop={children}/>
    </>
    );
};


export default Layout;