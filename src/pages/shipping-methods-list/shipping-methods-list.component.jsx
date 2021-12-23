import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSelector, useDispatch, connect } from 'react-redux';
import { loadShippingMethods, getShippingMethods } from '../../store/shippingMethods';

import DataTable from '../../components/data-table/data-table.component';

const ShippingMethodsListPage = (props) => {
  // const dispatch = useDispatch();
  // const shippingMethods = useSelector(getShippingMethods);

  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'provider', headerName: 'Provider', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    // { field: 'categoryId', headerName: 'Category ID', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ];

  useEffect(() => {
    props.loadShippingMethods();
    console.log('ShippingMethodsListPage: shippingMethods.loadShippingMethods()');
    // return () => {
    //     cleanup
    // }
  }, []);

  const rowDoubleClickHandler = (id) => {
    navigate(`/shipping-methods/${id}`);
  };

  return (
    <>
      <DataTable
        rows={props.shippingMethods}
        columns={columns}
        totalResults={props.meta.totalResults}
        limit={props.meta.limit}
        loading={props.meta.loading}
        loadActionCreator={props.loadShippingMethods}
        onPageChange={(newPage) => {
          props.loadShippingMethods(props.meta.limit, newPage + 1);
        }}
        onPageSizeChange={(newPageSize) => {
          props.loadShippingMethods(newPageSize, props.meta.page);
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
        onClick={() => navigate('/shipping-methods/add')}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

ShippingMethodsListPage.propTypes = {};

const mapStateToProps = (state) => ({
  shippingMethods: state.entities.shippingMethods.list,
  meta: state.entities.shippingMethods.meta,
  loading: state.entities.shippingMethods.loading,
});

export default connect(mapStateToProps, { loadShippingMethods, getShippingMethods })(
  ShippingMethodsListPage
);
