import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../components/category-form/category-form.component';

const CategoryPage = () => {
  const { categoryId } = useParams();

  return (
    <>
      <CategoryForm id={categoryId} />
    </>
  );
};

export default CategoryPage;
