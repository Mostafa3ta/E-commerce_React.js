import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/LoginSlice'
import { toast } from 'react-toastify';


export default function Login({ setUserInfo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.login)

  const validationSchema = Yup.object({
    username: Yup.string().required('UserName is required').min(3, ' UserName should at least be 3 characters').max(15, 'Maximum is 15 characters'),
    password: Yup.string().required('Password is required')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'),
  })


  async function handleLogin(values) {
    await dispatch(login(values))
    console.log(userData);
    navigate('/')
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  })

  return <>

    <Helmet>
      <title>Sign-In</title>
    </Helmet>

    <div className="container d-flex flex-column justify-content-center align-items-center page">
      <div className='signCard my-4 rounded-5'>
        <div className=" m-auto py-4 w-75">
          <div>
            <h2 className='mb-4 py-1 title text-main'>Sign-In</h2>
          </div>
          <div className='my-3'>
            <h4 className='mb-0'>Welcome !</h4>
            <p>please sign into your account below</p>
          </div>

          <form onSubmit={formik.handleSubmit}>

            <div className="mb-3">
              <label className='labelText' htmlFor="username">UserName : <span className='fst-italic px-2 text-secondary'>"emilys"</span></label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} type="username" name='username' id='username' className={` form-control ${formik.errors.username && formik.touched.username && 'border-danger'}`} />
              {formik.errors.username && formik.touched.username && <div className='text-danger'>{formik.errors.username}</div>}
            </div>

            <div className="">
              <label className='labelText' htmlFor="password">Password : <span className='fst-italic px-2 text-secondary'>"emilyspass"</span></label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' className={` form-control ${formik.errors.password && formik.touched.password && 'border-danger'}`} />
              {formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
            </div>

            {userData?.error?.length > 0 && <h6 className="text-danger my-2"><i className="fa-solid me-2 fa-xmark"></i>{userData?.error}</h6>}
            {userData?.loading ? <button type='button' className="btn btn-success w-100 btn-main my-4"><i className='fas fa-spinner fa-spin'></i></button> :
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className={`btn btn-success w-100 btn-main my-4 ${'btn-shadow'}`}>Sign In</button>}


          </form>

          <hr />
          <div className="text-center h6">Don't have an account?
            <Link to={'/register'} className='px-2 fw-bolder fst-italic text-main text-decoration-underline'>
              Sign-Up
            </Link>
          </div>
          <hr />
        </div>
      </div>
    </div >
  </>
}
