import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Navbar({ logOut }) {
  const { cart, favourite } = useSelector((state) => state)

  return <>

    <nav className="navbar navbar-expand-md navbar-light bg-light ">
      <div className="container-xxl">
        <Link className="navbar-brand fw-bolder" to="/"><i className="fa-solid fa-shop text-main"></i> Online Bazaar</Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {localStorage.getItem('dataToken') !== null && <ul className="navbar-nav text-center ms-4 ">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="searchproduct"><i className="fa-solid fa-magnifying-glass px-1"></i>Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="cart">
                <div className=' text-center mx-2'>
                  <i className="fa-solid position-relative fa-cart-shopping">
                    {cart?.cartTotalQuantity !== 0 && <span className='cart-count bg-warning pt-1 rounded-3 text-white'>{cart?.cartTotalQuantity}</span>}
                  </i>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="favourite">
                <i className="fa-solid mx-1 fa-heart">
                  {favourite?.favItems?.length !== 0 && <i className="fa-solid dotIcon fa-beat-fade fa-circle"></i>}
                </i>
              </Link>
            </li>
          </ul>}
          <ul className="navbar-nav ms-lg-auto mt-2 text-end me-lg-0 mt-lg-0">
            {localStorage.getItem('dataToken') === null ? <>
              <li className="nav-item text-center px-1">
                <Link className="nav-link text-main" to="register">Sign Up</Link>
              </li>
              <li className="nav-item text-center px-1">
                <Link className="nav-link text-main" to="login">Sign In</Link>
              </li> </>
              : <div className='dropstart'>
                <li className="nav-item text-center dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={JSON.parse(localStorage.getItem('userInfo'))?.image} className='user-img bg-dark rounded-circle' alt="userImage" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuLink">
                    <li className='dropdown-header'>
                      <div className='d-flex py-1 align-items-center gap-2'>
                      <span className=""><img src={JSON.parse(localStorage.getItem('userInfo'))?.image} className='bg-dark rounded-circle user-img ' alt="userImage" /></span>
                      <span className='text-black fs-6'>{JSON.parse(localStorage.getItem('userInfo'))?.firstName}</span>
                      </div>
                      <span className="d-block py-1 fs-6 text-muted">E-mail : <span className='text-black px-1'>{JSON.parse(localStorage.getItem('userInfo'))?.email}</span></span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className=' dropdown-item p-0 m-0'>
                      <div onClick={logOut} className="btn btn-danger rounded-0 w-100">LogOut<i className="fa-solid px-2 fa-right-from-bracket"></i></div>
                    </li>
                  </ul>
                </li>
              </div>
            }
          </ul>
        </div>
      </div>
    </nav >



  </>
}
