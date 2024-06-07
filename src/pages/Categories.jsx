import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { Loading } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/CategorySlice';

export default function Categories() {

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  // async function getCategories() {
  //   setisLoading(true)
  //   let { data } = await axios.get(`https://dummyjson.com/products/categories`)
  //   setCategories(data)
  //   setisLoading(false)
  // }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return <>

    <Helmet>
      <title>Categories</title>
    </Helmet>

    {categories?.loading ? <Loading /> :

      <div className="container page">
        <div className="row m-4 mt-4 justify-content-center text-center">
          {categories?.categories?.map((Category) =>
            <div className="col-md-4 h-auto col-lg-3 product-category m-2 rounded-3 py-1 cursor-pointer">
              <Link to={`/categorydetails/${Category.slug}`}>
                <h2 className='h5 tw-bold main'>{Category.name}</h2>
              </Link>
            </div>
          )}
        </div>
      </div >
    }

  </>
}
