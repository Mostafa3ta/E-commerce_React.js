import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { Loading } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/RegisterSlice'

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const newUserData = useSelector((state) => state.register)

  async function handleRegister(values) {
    await dispatch(register(values))
    console.log(newUserData);
    navigate('/login')
  }

  let validationSchema = Yup.object({
    firstName: Yup.string().required('name is required').min(3, 'at least 3 characters').max(10, 'maximum is 10 characters'),
    // lastName: Yup.string().required('name is required').min(3, 'at least 3 characters').max(10, 'maximum is 10 characters'),
    email: Yup.string().required('email is required').email('email is not valid'),
    password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Minimum eight characters, at least one letter, one number and one special character'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'password and rePassord does not match'),
    // phone: Yup.string().required('phone is required').matches(/^(\+2)?01[0125][0-9]{8}$/, 'it is not egy number'),
  })

  let formik = useFormik({
    initialValues: {
      firstName: '',
      // lastName: '',
      email: '',
      password: '',
      rePassword: '',
      // phone: '',
    },
    validationSchema,
    onSubmit: handleRegister
  })

  return <>

    <Helmet>
      <title>SignUp</title>
    </Helmet>

    {newUserData?.loading ? <Loading /> :

      <div className="container d-flex justify-content-center align-items-center page">
        <div className='signCard my-3 rounded-5'>
          <div className=" m-auto py-4 w-75">

            <div>
              <h2 className='mb-4 py-1 title text-main'>Sign-In</h2>
            </div>
            <div className='my-3'>
              <h4 className='mb-0'>Welcome !</h4>
              <p>please create an account below</p>
            </div>

            <form onSubmit={formik.handleSubmit}>

              <div className="mb-3">
                <label className='labelText' htmlFor="firstName">UserName :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstName} type="text" name='firstName' id='firstName' className='form-control ' />
                {formik.errors.firstName && formik.touched.firstName && <div className='text-danger'>{formik.errors.firstName}</div>}
              </div>

              {/* <div className="mb-3">
              <label className='labelText' htmlFor="lastName">LastName :</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName} type="text" name='lastName' id='lastName' className='form-control ' />
            {formik.errors.lastName && formik.touched.lastName && <div className='text-danger'>{formik.errors.lastName}</div>}
            </div> */}

              <div className="mb-3">
                <label className='labelText' htmlFor="email">Email :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' className='form-control ' />
                {formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className='labelText' htmlFor="password">Password :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id='password' className='form-control ' />
                {formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
              </div>

              <div className="mb-3">
                <label className='labelText' htmlFor="rePassword">Rewrite Password :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' className='form-control ' />
                {formik.errors.rePassword && formik.touched.rePassword && <div className='text-danger'>{formik.errors.rePassword}</div>}
              </div>

              {/* <div className="mb-3">
              <label className='labelText' htmlFor="phone">Phone</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='phone' className='form-control ' />
            {formik.errors.phone && formik.touched.phone && <div className='text-danger'>{formik.errors.phone}</div>}
            </div> */}

              {newUserData?.error?.length > 0 && <h6 className="text-danger my-2"><i className="fa-solid me-2 fa-xmark"></i>{newUserData?.error}</h6>}
              {newUserData?.loading ? <button type='button' className="btn btn-success w-100 btn-main my-4"><i className='fas fa-spinner fa-spin'></i></button> :
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className={`btn btn-success w-100 btn-main my-4 ${'btn-shadow'}`}>Sign Up</button>}

            </form>
            <hr />
            <div className="text-center h6">You already have an account?
              <Link to={'/login'} className='px-2 fw-bolder fst-italic text-decoration-underline'>
                Sign-In
              </Link>
            </div>
            <hr />
          </div>
        </div>
      </div>
    }
  </>
}
