import React from 'react';
import { useParams } from 'react-router-dom';
import ShippingMethodForm from '../../components/shipping-method-form/shipping-method-form.component';

const ShippingMethodPage = () => {
  const { shippingMethodId } = useParams();
  return (
    <>
      <ShippingMethodForm id={shippingMethodId} />
    </>
  );
};

export default ShippingMethodPage;
