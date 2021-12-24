import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSelector, useDispatch, connect } from 'react-redux';
import { loadOrders, getOrders } from '../../store/orders';

import DataTable from '../../components/data-table/data-table.component';

const OrdersListPage = (props) => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'referenceNumber', headerName: 'Ref. No.', width: 150 },
    { field: 'fulfillmentStatus', headerName: 'Fulfillment Status', width: 150 },
    { field: 'paymentStatus', headerName: 'Payment Status', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 300 },
    { field: 'totalWithTax', headerName: 'Total (w/ Tax)', width: 300 },
  ];

  useEffect(() => {
    props.loadOrders();
    console.log('OrdersListPage: orders.loadOrders()');
    // return () => {
    //     cleanup
    // }
  }, []);

  const rowDoubleClickHandler = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <>
      <DataTable
        rows={props.orders}
        columns={columns}
        totalResults={props.meta.totalResults}
        limit={props.meta.limit}
        loading={props.meta.loading}
        loadActionCreator={props.loadOrders}
        onPageChange={(newPage) => {
          props.loadOrders(props.meta.limit, newPage + 1);
        }}
        onPageSizeChange={(newPageSize) => {
          props.loadOrders(newPageSize, props.meta.page);
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
        disabled
        // onClick={() => navigate('/orders/add')}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

const mapStateToProps = (state) => ({
  orders: state.entities.orders.list,
  meta: state.entities.orders.meta,
  loading: state.entities.orders.loading,
});

export default connect(mapStateToProps, { loadOrders, getOrders })(
  OrdersListPage
);
