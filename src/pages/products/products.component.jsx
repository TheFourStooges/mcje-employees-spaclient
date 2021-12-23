import { Container, Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router-dom';

const ProductsPage = () => {
  return (
    <>
      <Typography variant="h5">Products</Typography>
      <br />
      <Outlet />
    </>
  );
};

export default ProductsPage;
