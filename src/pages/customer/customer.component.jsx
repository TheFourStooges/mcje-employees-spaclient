import React from 'react'
import { useParams } from 'react-router-dom'
import CustomerForm from '../../components/customer-form/customer-form.component';

const CustomerPage = () => {
  const { customerId } = useParams();
  return (
    <>
      <CustomerForm id={customerId}></CustomerForm>
    </>
  )
}

export default CustomerPage
