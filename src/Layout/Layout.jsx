import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Offline } from "react-detect-offline";
import { Helmet } from "react-helmet";
import { Footer, Navbar } from '../components';
import { toast } from 'react-toastify';

export default function Layout() {
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('dataToken')
    localStorage.removeItem('newCart')
    localStorage.removeItem('CartCount')
    navigate('/login')
    toast.success('Logged out successfully', {
      position: 'bottom-left'
    })
  }

  return <>

    <Helmet >
      <title>Home</title>
    </Helmet>

    <div className='layout '>
      <Navbar logOut={logOut} />

      <div className="container">
        <Outlet></Outlet>
      </div>
      {/* <Footer /> */}
    </div>
    <Offline> <div className='offline-detect rounded fw-bolder p-2'><i className="fa-solid fa-triangle-exclamation pe-2"></i>No internet connection</div> </Offline>
  </>
}
