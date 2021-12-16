import React from 'react'
import { useParams } from 'react-router-dom'

const OrderPage = () => {
  const { orderId } = useParams();
  return (
    <div>
      Order {orderId}
    </div>
  )
}

export default OrderPage
