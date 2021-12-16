import React from 'react';
import { Outlet } from 'react-router-dom';

const ShippingMethodsPage = () => {
  return (
    <div>
      SHIPPING METHODS
      <Outlet />
    </div>
  );
};

export default ShippingMethodsPage;
