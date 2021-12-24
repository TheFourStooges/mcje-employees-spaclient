import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSelector, useDispatch, connect } from 'react-redux';
import { loadCategories, getCategories } from '../../store/categories';

import DataTable from '../../components/data-table/data-table.component';

const CategoriesListPage = (props) => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'slug', headerName: 'Slug', width: 300 },
    { field: 'parentId', headerName: 'Parent Category ID', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ];

  useEffect(() => {
    props.loadCategories();
    console.log('categoriesListPage: categories.loadCategories()');
    // return () => {
    //     cleanup
    // }
  }, []);

  const rowDoubleClickHandler = (id) => {
    navigate(`/categories/${id}`);
  };

  return (
    <>
      <DataTable
        rows={props.categories}
        columns={columns}
        totalResults={props.meta.totalResults}
        limit={props.meta.limit}
        loading={props.meta.loading}
        loadActionCreator={props.loadCategories}
        onPageChange={(newPage) => {
          props.loadCategories(props.meta.limit, newPage + 1);
        }}
        onPageSizeChange={(newPageSize) => {
          props.loadCategories(newPageSize, props.meta.page);
        }}
        rowDoubleClickHandler={rowDoubleClickHandler}
      />
      <Fab
        color="primary"
        aria-label="add"
        style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}
        onClick={() => navigate('/categories/add')}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

const mapStateToProps = (state) => ({
  categories: state.entities.categories.list,
  meta: state.entities.categories.meta,
  loading: state.entities.categories.loading,
});

export default connect(mapStateToProps, { loadCategories, getCategories })(
  CategoriesListPage
);
