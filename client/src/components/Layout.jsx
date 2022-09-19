import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Navbar from '../commons/Navbar';
import { setUser } from '../state/user';

const Layout = ({ children }) => {

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
                .then((resp) => {dispatch(setUser(resp.data))})
        }
    },[])

    return (
    <>
        <Navbar prop={children}/>
    </>
    );
};


export default Layout;