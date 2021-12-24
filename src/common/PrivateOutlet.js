import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import Layout from '../components/layout/layout.component';

const PrivateOutlet = ({ auth, ...rest }) => {
  if (auth.loading) {
    // Can be replaced with spinning icon
    return <CircularProgress />;
  } else if (!auth.authenticated) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateOutlet);
