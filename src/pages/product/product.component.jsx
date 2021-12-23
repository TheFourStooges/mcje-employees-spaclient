import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/product-form/product-form.component';

const ProductPage = () => {
  const { productId } = useParams();
  // const {
  //   register, // subscribe and type check input
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  // const []

  // useEffect(() => {
  //   console.log(productId, 'view');
  // });

  return (
    <>
      <ProductForm id={productId} />
    </>
  );
};

export default ProductPage;
