import React, { useMemo, useState } from 'react'
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getProductSearch } from '../redux/SearchSlice';
import { ProductsWrapper } from '../components';

export default function SearchDisplay() {

  const dispatch = useDispatch()
  const productSearch = useSelector((state) => state.productSearch)

  const [SearchValue, setSearchValue] = useState('');

  useMemo(() => dispatch(getProductSearch(SearchValue)), [SearchValue])


  return <>

    <Helmet>
      <title>Search</title>
    </Helmet>

    <div className='container page'>
      <div className="row my-3 align-items-center mt-4">
        <div className="d-flex justify-content-center">
          <input className="form-control m-4 px-4 w-50 border-success rounded-5 " onChange={(e) => setSearchValue(e.target.value)} value={SearchValue} type="search" placeholder="Search for Products" aria-label="Search" />
        </div>

        {productSearch?.productSearch?.products?.length === 0 ? <>

          <div className='notFound'>No Results Found</div>

        </> : <>

          <ProductsWrapper products={productSearch?.productSearch?.products} />

        </>}
      </div>
    </div>
  </>
}
