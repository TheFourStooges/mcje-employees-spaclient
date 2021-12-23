import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSelector, useDispatch, connect } from 'react-redux';
import { loadUsers, getUsers } from '../../store/users';

import DataTable from '../../components/data-table/data-table.component';

const UserAccountsListPage = (props) => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'isEmailVerified', type: 'boolean', headerName: 'Email Verified?', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ];

  useEffect(() => {
    props.loadUsers(10, 1);
    console.log('usersListPage: users.loadUsers()');
    // return () => {
    //     cleanup
    // }
  }, []);

  const rowDoubleClickHandler = (id) => {
    navigate(`/accounts/${id}`);
  };

  return (
    <>
      <DataTable
        rows={props.users}
        columns={columns}
        totalResults={props.meta.totalResults}
        limit={props.meta.limit}
        loading={props.meta.loading}
        loadActionCreator={props.loadUsers}
        onPageChange={(newPage) => {
          props.loadUsers(props.meta.limit, newPage + 1);
        }}
        onPageSizeChange={(newPageSize) => {
          props.loadUsers(newPageSize, props.meta.page);
        }}
        rowDoubleClickHandler={rowDoubleClickHandler}
      />
      {/* <Fab
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
        onClick={() => navigate('/customers/add')}
      >
        <AddIcon />
      </Fab> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.entities.users.list,
  meta: state.entities.users.meta,
  loading: state.entities.users.loading,
});

export default connect(mapStateToProps, { loadUsers, getUsers })(
  UserAccountsListPage
);
