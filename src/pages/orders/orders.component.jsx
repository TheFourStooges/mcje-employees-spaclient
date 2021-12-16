import React from 'react'
import { Outlet } from 'react-router-dom'

const OrdersPage = () => {
  return (
    <div>
      ORDERS
      <Outlet />
    </div>
  )
}

export default OrdersPage
