import React from 'react'
import { Link } from 'react-router-dom'
import Rate from './Rate'
import { addToCart } from '../redux/CartSlice'
import { useDispatch } from 'react-redux'
import { AddToFav, RemoveFromFav } from '../redux/FavSlice'

export default function ProductsWrapper({ products }) {
    const dispatch = useDispatch()

    function handleAddToFav(product) {
        dispatch(AddToFav(product))
    }

    function handleRemoveFav(product) {
        dispatch(RemoveFromFav(product))
    }



    return (<>
        {products?.map((product) => <div key={product.id} className="cursor-pointer col-md-4 col-6 col-lg-3 col-xl-2">
            <div className="my-3 py-3 product px-2 rounded-3 ">
                <Link to={`/productdetails/${product.id}`}>
                    <img src={product.thumbnail} className='w-100' alt="productImg" />
                    <span className='text-success text-capitalize font-sm'>{product.category}</span>
                    <h3 className='h6 fw-bolder p-0 m-0'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                    <Rate currentRate={product.rating} rateSize={'rateSize'} />
                    <div className='d-flex gap-2 my-2'>
                        <span className='fw-semibold'>$ {Math.trunc(product.price)}</span>
                        <div className='bg-success-subtle px-1 fs-6 fw-bold text-success my-auto rounded w-auto'> - {product.discountPercentage}%</div>
                    </div>
                </Link>
                <div className='d-flex gap-1 mt-3 align-items-center'>
                    <button onClick={() => dispatch(addToCart(product))} className="btn btn-success btn-add p-1 w-75">+ Add</button>

                    {product.isFav ?

                        <button onClick={() => handleRemoveFav(product)} className='btn btn-light p-1 w-25'>
                            <i className="fa-solid fs-5 text-danger fa-heart"></i>
                        </button>
                        :
                        <button onClick={() => handleAddToFav(product)} className='btn btn-light p-1 w-25'>
                            <i className="fa-regular fs-5 text-secondary fa-heart"></i>
                        </button>
                    }
                </div>
            </div>
        </div>)}

    </>)
}
