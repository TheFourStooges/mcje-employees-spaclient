import React from 'react';
import { Container, Typography } from '@mui/material';

import { Outlet } from 'react-router-dom';

const UserAccountsPage = () => {
  return (
    <div>
      <Typography variant='h5'>User Accounts</Typography>
      <br/>
      <Outlet />
    </div>
  );
};

export default UserAccountsPage;
