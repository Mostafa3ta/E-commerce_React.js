import React from 'react'
import { Helmet } from "react-helmet";
import { FeatureProducts } from '../components';


export default function Products() {
  return <>

    <Helmet>
      <title>Products</title>
    </Helmet>

      <FeatureProducts/>
  </>
}
