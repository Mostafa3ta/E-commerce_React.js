import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../redux/CartSlice";
import { Rate } from "../components";
import { Helmet } from "react-helmet";

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (<>

        <Helmet>
            <title>Cart</title>
        </Helmet>

        <div className="p-4 my-5 bg-light rounded">
            <h2 className='fw-bolder fs-1'>Cart</h2>
            {cart.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p className="notFound text-start my-3 fs-5">Your cart is currently empty</p>
                    <button onClick={() => navigate('/')} className="btn btn-secondary">Start Shopping</button>
                </div>
            ) : (
                <div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5 className='text-black pt-4 pb-2'>Total Price is : <span className="text-main">$ {cart.cartTotalAmount}</span></h5>
                            <button className='btn btn-warning'>Check Out</button>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {/* {cart.cartItems && */}
                        {cart.cartItems.map((product) => (
                            <div className='row my-3 align-items-center '>

                                <Link to={`/productdetails/${product.id}`} className="col-md-2 col-sm-3 col-4 my-2 cursor-pointer">
                                    <img src={product.thumbnail} className='w-100' alt="" />
                                </Link>
                                <div className="col-md-10 h-100 col-sm-9 my-1 d-flex justify-content-between">
                                    <div>
                                        <span className='text-success text-capitalize font-sm'>{product.category}</span>
                                        <h6 className="py-0 my-0">{product.title}</h6>
                                        <Rate currentRate={product.rating} rateSize={'rateSize'} />
                                        <div className="py-2">
                                            <h6 className='text-main p-0 m-0'> <span className="text-muted fst-italic px-1">Piece :</span> $ {product.price}</h6>
                                            <h6 className='text-main p-0 m-0'> <span className="text-muted fst-italic px-1">Total :</span> $ {product.price * product.cartQuantity}</h6>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center flex-column col-md-4 col-sm-3 col-5 mb-2 '>
                                        <div>
                                            <button onClick={() => handleAddToCart(product)} className='btn btn-outline-secondary'>+</button>
                                            <button className='bg-secondary-subtle btn border-main px-2 mx-2'>{product.cartQuantity}</button>
                                            <button disabled={product.cartQuantity === 1} onClick={() => handleDecreaseCart(product)} className='btn btn-outline-secondary'>-</button>
                                        </div>
                                        <div>
                                            <button onClick={() => handleRemoveFromCart(product)} className='btn btn-sm btn-outline-danger'><i className='fa-regular fa-trash-can'></i> Remove</button>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-2" />
                            </div>
                        ))}
                    </div>
                    <div className="d-flex">
                        <button onClick={() => navigate('/')} className='btn btn-secondary m-2'>Continue Shopping</button>
                        <button onClick={() => handleClearCart()} className='btn btn-danger m-2'>Clear Cart</button>
                    </div>
                </div>
            )
            }
        </div >
    </>);
};