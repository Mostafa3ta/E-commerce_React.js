import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { Helmet } from "react-helmet";
import { Loading, Rate } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../redux/ProductDetailsSlice'
import { addToCart } from '../redux/CartSlice';
import { AddToFav, RemoveFromFav } from '../redux/FavSlice';

export default function ProductDetails() {
  const dispatch = useDispatch()
  const params = useParams()
  const productDetails = useSelector((state) => state.productDetails)
  const [finalPrice, setFinalPrice] = useState(0)

  async function getProduct(id) {
    await dispatch(getProductDetails(id))
  }

  function calcPrice(product) {
    const final = Math.trunc(product.price - (product.price * product.discountPercentage / 100))
    setFinalPrice(final)
  }

  function handleAddToFav(product) {
    dispatch(AddToFav(product))
  }

  function handleRemoveFav(product) {
    dispatch(RemoveFromFav(product))
  }

  useMemo(() => {
    calcPrice(productDetails?.productDetails)
  }
    , [productDetails])


  useEffect(() => {
    getProduct(params.id)
  }, [])

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }


  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return <>

    <Helmet>
      <title>Product Details</title>
    </Helmet>

    {productDetails?.loading ? <Loading /> :
      <div className='container page'>
        <div className="row py-3 my-3">
          <div className="col-md-5 col-lg-4 ">
            <div className='d-flex my-5 flex-column gap-5'>
              <div className='p-3'>
                {productDetails?.productDetails?.images?.length > 1 ? <>
                  <Slider {...settings} className='shadow'>
                    {productDetails?.productDetails?.images?.map((image, index) =>
                      <img key={index} src={image} className='w-100 object-fit-contain' alt="product-img" />
                    )}
                  </Slider>
                </> : <img src={productDetails?.productDetails?.images} className='w-100 object-fit-contain shadow' alt="product-img" />}
              </div>
              <div className='d-flex px-3 gap-1'>
                <button onClick={() => dispatch(addToCart(productDetails?.productDetails))} className="btn bg-success w-75 text-white">+ Add to Cart</button>
                {productDetails?.productDetails?.isFav ?

                  <button onClick={() => handleRemoveFav(productDetails?.productDetails)} className='btn btn-light p-1 w-25'>
                    <i className="fa-solid fs-6 text-danger fa-heart"></i>
                  </button>
                  :
                  <button onClick={() => handleAddToFav(productDetails?.productDetails)} className='btn btn-light p-1 w-25'>
                    <i className="fa-regular fs-5 text-secondary fa-heart"></i>
                  </button>
                }
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8 detailsContain rounded my-5">
            <div className='py-2'>
              <h3 className=' text-bold py-1 m-0'>{productDetails?.productDetails?.title}</h3>
              <div className='d-flex gap-2 p-0 m-0'>
                <Rate currentRate={productDetails?.productDetails?.rating} />
                <div>|</div>
                <div className=''><span>reviews</span> ({productDetails?.productDetails?.reviews?.length})</div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className='w-75 my-auto'>
                <p className='py-2'>{productDetails?.productDetails?.description}</p>
              </div>
              <div className='w-25 text-center my-auto'>
                <img src={productDetails?.productDetails?.meta?.qrCode} className='object-fit-contain w-50' alt="product-QR-Code" />
              </div>
            </div>
            <hr className='py-1 my-1' />

            {productDetails?.productDetails?.brand && <> <div className='d-flex my-0'>
              <h6 className='text-muted'>Brand : <span className='fs-6 px-2 text-black'>{productDetails?.productDetails?.brand}</span></h6>
            </div>
              <hr className='py-1 my-1' /> </>}

            <div className='d-flex my-0'>
              <h6 className='text-muted'>Price :</h6>
              <h6 className='px-2 text-danger mt-auto text-decoration-line-through fs-6 '>$ {productDetails?.productDetails?.price}</h6>
              <h6 className='pe-2 '>$ {finalPrice}</h6>
              <div className='bg-success-subtle px-2 fw-bold text-success mb-auto rounded w-auto'>{productDetails?.productDetails?.discountPercentage}% <span className='px-1'>off</span> </div>
            </div>
            <hr className='py-1 my-1' />

            <div className='d-flex flex-wrap my-0'>
              <h6 className='text-muted'>Shipping : <span className='fs-6 px-2 text-black'>{productDetails?.productDetails?.shippingInformation}</span></h6>
            </div>
            <hr className='py-1 my-1' />

            <div className='d-flex my-0'>
              <h6 className='text-muted'>Warranty : <span className='fs-6 px-2 text-black'>{productDetails?.productDetails?.warrantyInformation}</span></h6>
            </div>
            <hr className='py-1 my-1' />

            <div className='d-flex my-0'>
              <h6 className='text-muted'>Availability : <span className='fs-6 px-2 text-black'>({productDetails?.productDetails?.stock}) <span className='px-1 fst-italic fs-6'> items left in stock</span></span></h6>
            </div>
            <hr className='py-1 my-1' />

            <div className='d-flex my-0'>
              <h6 className='text-muted'>Categouries :</h6>
              <Link to={`/categorydetails/${productDetails?.productDetails?.category}`} >
                <h6 className='px-2 text-capitalize cursor-pointer categoryHover'>{productDetails?.productDetails?.category}</h6>
              </Link>
            </div>
            <hr className='py-1 my-1' />

            <div className='d-flex mb-1'>
              <h6 className='text-muted'>Return : <span className='fs-6 px-2 text-black'>{productDetails?.productDetails?.returnPolicy}</span></h6>
            </div>

          </div>
        </div>
        <hr />

        <div>
          <h2 className='fw-bolder text-success py-4'>Reviews :</h2>
          <div className='row gap-4 mb-3 align-items-center'>
            {productDetails?.productDetails?.reviews?.map((review) => <>
              <div className='col-md-6 p-3 reviewCard rounded'>
                <div className="d-flex  gap-2">
                  <i className="fa-solid rounded-circle bg-secondary reviewIcon p-3 text-white fs-4 fa-user"></i>
                  <div className='d-flex flex-column gap-0'>
                    <h6 className='p-0 m-0'>{review.reviewerName}</h6>
                    <p className='p-0 m-0'>{review.reviewerEmail}</p>
                  </div>
                </div>
                {/* <hr className='w-75 m-2 text-center mx-auto' /> */}
                <h5 className='py-3 px-1'>
                  {review.comment}
                </h5>
                {/* <hr className='w-75 m-2 text-center mx-auto' /> */}
                <div className='d-flex justify-content-between'>
                <Rate currentRate={review.rating} rateSize={'rateSize'} />
                <p className='p-0 m-0 text-muted'>{review.date.split('T0').slice(0, 1)}</p>
                </div>
              </div>
            </>)}
          </div>
        </div>
      </div>
    }
  </>
}
