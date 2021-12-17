import { Container, Typography } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom'

const OrdersPage = () => {
  return (
    <div>
      <Container maxWidth={false}>
        <div>
          <Typography variant="h5">Orders</Typography>
        </div>
        <br />
        <Outlet />
      </Container>
    </div>
  )
}

export default OrdersPage
