import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';

const CustomersPage = () => {
  return (
    <>
      <Typography variant="h5">Customers</Typography>
      <br/>
      <Outlet />
    </>
  );
};

export default CustomersPage;
