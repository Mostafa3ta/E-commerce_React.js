import React from 'react'
import { Navigate } from 'react-router-dom'


export default function PreventLogin(props) {

  if (localStorage.getItem('dataToken') !== null) {
    console.log(props.children);
    return <Navigate to={'/'} />;
  }
  else {
    return props.children;
  }
}
