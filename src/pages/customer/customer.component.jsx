import React from 'react'
import { useParams } from 'react-router-dom'

const CustomerPage = () => {
  const { customerId } = useParams();
  return (
    <div>
      Customre {customerId}
    </div>
  )
}

export default CustomerPage
