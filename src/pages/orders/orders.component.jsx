import { Container, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const OrdersPage = () => {
  return (
    <>
      <Typography variant="h5">Orders</Typography>
      <br />
      <Outlet />
    </>
  );
};

export default OrdersPage;
