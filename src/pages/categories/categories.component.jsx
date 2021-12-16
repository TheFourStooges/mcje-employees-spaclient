import React from 'react';
import { Outlet } from 'react-router-dom';

const CategoriesPage = () => {
  return (
    <div>
      Categories
      <Outlet />
    </div>
  );
};

export default CategoriesPage;
