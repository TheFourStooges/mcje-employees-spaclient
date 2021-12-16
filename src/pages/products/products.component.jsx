import { Container, Fab, Typography } from '@mui/material';
import React from 'react';

import AddIcon from '@mui/icons-material/Add';

// import { Button } from '@mui/material'
import { Link, Outlet } from 'react-router-dom';

const ProductsPage = () => {
  return (
    <div>
      <Container maxWidth={false}>
        <div>
          <Typography variant="h5">Products</Typography>
        </div>
        <br />
        <Outlet />
      </Container>

      {/* <Fab
        color="primary"
        aria-label="add"
        style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}
      >
        <AddIcon />
      </Fab> */}
    </div>
  );
};

export default ProductsPage;
