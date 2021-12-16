import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productId } = useParams();
  // console.log(productId)

  // const []

  useEffect(() => {
    console.log(productId, "fetch");
  })

  return <div>Product {productId}</div>;
};

export default ProductPage;
