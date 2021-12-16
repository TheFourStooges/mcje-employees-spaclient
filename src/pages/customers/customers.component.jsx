import React from 'react';
import { Outlet } from 'react-router-dom';

const CustomersPage = () => {
  return (
    <div>
      CUSTOMERS
      <Outlet />
    </div>
  );
};

export default CustomersPage;
