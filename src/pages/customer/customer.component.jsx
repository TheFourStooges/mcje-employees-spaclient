import React from 'react'
import { useParams } from 'react-router-dom'

const CustomerPage = () => {
  const { customerId } = useParams();
  return (
    <>
      Customre {customerId}
    </>
  )
}

export default CustomerPage
