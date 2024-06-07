import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { Loading, ProductsWrapper } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetails } from '../redux/CategoryDetailsSlice';

export default function CategoryDetails() {
  const dispatch = useDispatch()
  const params = useParams()
  const categoryDetails = useSelector((state) => state.categoryDetails)

  async function getCategory(category) {
   await dispatch(getCategoryDetails(category))
  }

  useEffect(() => {
    getCategory(params.category);

  }, [])

  return <>

    <Helmet>
      <title>Categories</title>
    </Helmet>

    {categoryDetails?.loading ? <Loading /> :
      <div className='container page'>
        <div className="row my-4">
          <h2 className='fw-bolder text-success text-capitalize'>{`${params.category.split('-').join(' ')}`} :</h2>
          <ProductsWrapper products={categoryDetails?.categoryDetails?.products} />

        </div>
      </div>
    }
  </>
}
