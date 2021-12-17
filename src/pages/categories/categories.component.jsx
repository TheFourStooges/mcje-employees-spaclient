import { Container, Typography } from '@mui/material';
import React from 'react';

import { Outlet } from 'react-router-dom';

const CategoriesPage = () => {
  return (
    <div>
      <Container maxWidth={false}>
        <div>
          <Typography variant="h5">Categories</Typography>
        </div>
        <br />
        <Outlet />
      </Container>
    </div>
  );
};

export default CategoriesPage;