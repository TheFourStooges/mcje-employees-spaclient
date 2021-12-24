import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSelector, useDispatch, connect } from 'react-redux';
import { loadAssets, getAssets } from '../../store/assets';
import config from '../../config/config';

import DataTable from '../../components/data-table/data-table.component';

const AssetsListPage = (props) => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'url', headerName: 'URL', width: 100 },
    { field: 'path', headerName: 'Path', width: 300 },
    { field: 'filename', headerName: 'File Name', width: 300 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'fileSize', headerName: 'File Size (Bytes)', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ];

  useEffect(() => {
    props.loadAssets();
    console.log('assetsListPage: assets.loadAssets()');
    // return () => {
    //     cleanup
    // }
  }, []);

  const rowDoubleClickHandler = (id) => {
    navigate(`/assets/${id}`);
  };

  return (
    <>
      <DataTable
        rows={props.assets}
        columns={columns}
        totalResults={props.meta.totalResults}
        limit={props.meta.limit}
        loading={props.meta.loading}
        loadActionCreator={props.loadAssets}
        onPageChange={(newPage) => {
          props.loadAssets(props.meta.limit, newPage + 1);
        }}
        onPageSizeChange={(newPageSize) => {
          props.loadAssets(newPageSize, props.meta.page);
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
        onClick={() => navigate('/assets/add')}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

const mapStateToProps = (state) => ({
  assets: state.entities.assets.list,
  meta: state.entities.assets.meta,
  loading: state.entities.assets.loading,
});

export default connect(mapStateToProps, { loadAssets, getAssets })(
  AssetsListPage
);
