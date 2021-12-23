import React from 'react';
import { Container, Typography } from '@mui/material';

import { Outlet } from 'react-router-dom';

const ShippingMethodsPage = () => {
  return (
    <div>
      <Typography variant='h5'>Shipping Methods</Typography>
      <br/>
      <Outlet />
    </div>
  );
};

export default ShippingMethodsPage;
