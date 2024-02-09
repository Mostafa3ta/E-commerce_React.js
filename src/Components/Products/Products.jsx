import React from 'react'
import { Helmet } from "react-helmet";
import FeatureProducts from '../FeatureProducts/FeatureProducts';


export default function Products() {
  return <>

    <Helmet>
      <title>Products</title>
    </Helmet>

      <FeatureProducts/>
  </>
}
