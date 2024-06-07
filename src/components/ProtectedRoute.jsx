import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {

  if (localStorage.getItem('dataToken') === null) {
    console.log(props.children);
    // toast.dismiss('Please Sign In to have access', { duration: 4000 })
    return <Navigate to={'/login'} />;
  }
  else {
    return props.children;
  }
}
