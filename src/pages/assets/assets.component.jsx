import { Container, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AssetsPage = () => {
  return (
    <>
      <Typography variant="h5">Assets</Typography>
      <br />
      <Outlet />
    </>
  );
};

export default AssetsPage;
