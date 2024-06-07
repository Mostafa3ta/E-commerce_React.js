import React, { useMemo, useState } from 'react'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/ProductSlice'
import ProductsWrapper from './ProductsWrapper'

export default function FeatureProducts() {
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)

  function handlePrev() {
    setPage((page) => page - 1)
  }

  function handleNext() {
    setPage((page) => page + 1)
  }

  useMemo(() => dispatch(getProducts(page))
    , [page])

  return (<>

    {products?.loading ? <Loading />
      : <>
        <h2 className='fw-bolder text-success py-2'>Products :</h2>
        <div className="row align-items-center my-3 bg-light rounded-3">

          <ProductsWrapper products={products?.products?.products} />

          <div className='d-flex gap-2 justify-content-center align-items-center my-4'>
            {page === 0 ? <button disabled className=' btn-success btn-sm btn'>
              <i className="fa-solid fa-angles-left"></i>
            </button> :
              <button onClick={() => handlePrev()} className=' btn-success btn-sm btn'>
                <i className="fa-solid fa-angles-left"></i>
              </button>}

            <div className="flex">
              {page !== 0 && <button onClick={() => handlePrev()} className='btn btn-success btn-sm m-1'>{page}</button>}
              <button className='btn btn-success fs-5 m-1'>{page + 1}</button>
              {page !== 8 && <button onClick={() => handleNext()} className='btn btn-success btn-sm m-1'>{page + 2}</button>}
            </div>

            {page === 8 ? <button disabled className='btn btn-success btn-sm'>
              <i className="fa-solid fa-angles-right"></i>
            </button> :
              <button onClick={() => handleNext()} className=' btn-sm btn btn-success '>
                <i className="fa-solid fa-angles-right"></i>
              </button>}
          </div>
        </div>
      </>}

  </>)
}
