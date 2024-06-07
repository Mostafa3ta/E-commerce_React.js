import React from 'react'
import { Helmet } from "react-helmet";
import { CategorySlider, FeatureProducts } from '../components';


export default function Home() {
  return <>

    <Helmet>
      <title>Home</title>
    </Helmet>
    <CategorySlider />
    <hr />
    <FeatureProducts />
  </>
}
