import { Container, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AssetsPage = () => {
  return (
    <div>
      <Container maxWidth={false}>
        <div>
          <Typography variant="h5">Assets</Typography>
        </div>
        <br />
        <Outlet />
      </Container>
    </div>
  );
};

export default AssetsPage;
