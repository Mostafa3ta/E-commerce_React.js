import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProductsWrapper } from '../components';
import { clearFav } from '../redux/FavSlice';
import { Helmet } from 'react-helmet';

export default function Favourite() {
  const favourite = useSelector((state) => state.favourite);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (<>
    <Helmet>
      <title>Cart</title>
    </Helmet>
    <div className='p-4 my-5 bg-light rounded'>
      <h2 className='fw-bolder fs-1'>Wishlist</h2>
      {favourite?.favItems?.length === 0 ? (
        <div className="cart-empty">
          <p className="notFound text-start my-3 fs-5">Your Wishlist is currently empty</p>
          <button onClick={() => navigate('/')} className="btn btn-secondary">Start Shopping</button>
        </div>
      ) : (<>
        <div className="row align-items-center productsContain my-3 bg-light rounded-3">
          <ProductsWrapper products={favourite?.favItems} />
        </div>
        <div className="d-flex">
          <button onClick={() => navigate('/')} className='btn btn-secondary m-2'>Continue Shopping</button>
          <button onClick={() => dispatch(clearFav())} className='btn btn-danger m-2'>Clear Wishlist</button>
        </div>
      </>)}
    </div >
  </>)
}
