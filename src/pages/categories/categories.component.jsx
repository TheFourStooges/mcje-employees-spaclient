import { Container, Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router-dom';

const CategoriesPage = () => {
  return (
    <>
      <Typography variant="h5">Categories</Typography>
      <br />
      <Outlet />
    </>
  );
};

export default CategoriesPage;
