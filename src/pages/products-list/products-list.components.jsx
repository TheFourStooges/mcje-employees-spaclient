import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch, connect } from 'react-redux';
import { loadProducts, getProducts } from '../../store/products';

import DataTable from '../../components/data-table/data-table.component';

const ProductsListPage = (props) => {
  // const dispatch = useDispatch();
  // const products = useSelector(getProducts);

  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'basePrice', headerName: 'Base Price', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'categoryId', headerName: 'Category ID', width: 150 },
  ];

  useEffect(() => {
    props.loadProducts();
    console.log('ProductsListPage: products.loadProducts()');
    // return () => {
    //     cleanup
    // }
  }, []);

  const rowDoubleClickHandler = (id) => {
    navigate(`/products/${id}`);
  };

  // console.log(useSelector(getProducts));

  return (
    // <div style={{ height: '100%', display: 'flex' }}>
    //   <DataGrid
    //     autoHeight
    //     rows={props.products}
    //     columns={columns}
    //     components={{ Toolbar: GridToolbar }}
    //     rowCount={props.meta.totalResults}
    //     pageSize={props.meta.limit}
    //     rowsPerPageOptions={[5, 10, 15, 20]}
    //     pagination
    //     paginationMode="server"
    //     loading={props.meta.loading}
    //     onPageChange={(newPage) => {
    //       props.loadProducts(props.meta.limit, newPage + 1);
    //     }}
    //     onPageSizeChange={(newPageSize) => {
    //       props.loadProducts(newPageSize, props.meta.page);
    //     }}
    //     onRowDoubleClick={(params, evt, details) =>
    //       rowDoubleClickHandler(params.id)
    //     }
    //   />
    // </div>
    <DataTable
      rows={props.products}
      columns={columns}
      totalResults={props.meta.totalResults}
      limit={props.meta.limit}
      loading={props.meta.loading}
      loadActionCreator={props.loadProducts}
      onPageChange={(newPage) => {
        props.loadProducts(props.meta.limit, newPage + 1);
      }}
      onPageSizeChange={(newPageSize) => {
        props.loadProducts(newPageSize, props.meta.page);
      }}
      rowDoubleClickHandler={rowDoubleClickHandler}
    />
  );
};

ProductsListPage.propTypes = {};

const mapStateToProps = (state) => ({
  products: state.entities.products.list,
  meta: state.entities.products.meta,
  loading: state.entities.products.loading,
});

export default connect(mapStateToProps, { loadProducts, getProducts })(
  ProductsListPage
);
