/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useSelector, useDispatch, connect } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../../store/users';

import DataTable from '../data-table/data-table.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography, Paper } from '@mui/material';

import {
  FormInputText,
  FormInputDropdown,
  FormInputMultiCheckbox,
} from '../form-components';
import ImageSelector from '../image-selector/image-selector.component';

import config from '../../config/config';
import attributesEnum from '../../config/attributesEnum';

const axios = require('axios');

// https://jasonwatmore.com/post/2020/10/14/react-hook-form-combined-add-edit-create-update-form-example
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
const UserAccountForm = (props) => {
  const [user, setUser] = useState({});
  // const [orders, setOrders] = useState([]);

  // If params has id defined => edit mode
  // const { history, match } = props;
  const navigate = useNavigate();
  const { id } = props;
  // Add mode = !Edit mode
  const isAddMode = !id;

  const createValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string(),
    role: Yup.mixed().concat(
      isAddMode ? Yup.mixed().oneOf(['admin', 'user']).required() : null
    ),
    password: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .concat(isAddMode ? Yup.string().required('Password required') : null)
      .min(8, 'Password must be at least 8 characters'),
    password2: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .when('password', (password, schema) => {
        if (password || isAddMode)
          return schema.required('Confirm Password required');
      })
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
    control,
  } = useForm({
    resolver: yupResolver(createValidationSchema),
  });

  const onSubmit = (fields) => {
    const { name, email, phone, password, role, ...restOfBody } = fields;

    const newBody = { name, email, phone, role, password };

    if (isAddMode) {
      console.log(isAddMode, newBody);
      props.addUser(newBody);
    } else {
      props.updateUser(id, newBody);
      console.log(isAddMode, newBody);
    }
    window.alert('Dispatched request');
  };

  const onDelete = () => {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      props.deleteUser(id);
      navigate('..');
    }
  };

  useEffect(() => {
    if (!isAddMode) {
      // get product and set form fields
      axios
        .request({
          baseURL: config.baseUrl,
          url: `/users/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${props.accessToken}`,
          },
        })
        .then(({ data }) => {
          // const fields = [
          //   'title',
          //   'firstName',
          //   'lastName',
          //   'email',
          //   'role',
          // ];
          // fields.forEach((field) =>
          //   setFieldValue(field, user[field], false)
          // );

          console.log('Data here', data);

          const firstLevel = ['name', 'email', 'phone', 'role'];
          // Set form values
          firstLevel.forEach((field) => setValue(field, data[field]));

          // console.log(data.orders);
          setUser(data);
        });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Typography variant="h5">
        {isAddMode ? 'Add User Account' : 'Edit User Account'}
      </Typography>
      <div className="row">
        <div className="col-xl-8">
          <Paper className="card">
            <div className="card__header">
              <div className="card__header__title">Details</div>
            </div>

            <div>
              <div className="row">
                <div className="form-group col">
                  <FormInputText
                    name="name"
                    control={control}
                    label="User's Name"
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <FormInputText
                    name="email"
                    control={control}
                    label="Email Address"
                  />
                </div>
                <div className="form-group col">
                  <FormInputText
                    name="phone"
                    control={control}
                    label="Phone Number"
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <FormInputText
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                  />
                </div>
                <div className="form-group col">
                  <FormInputText
                    name="password2"
                    control={control}
                    label="Retype Password"
                    type="password"
                  />
                </div>
              </div>
            </div>
          </Paper>

          <Paper className="card">
            <div className="card__header">
              <div className="card__header__title">Role</div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label>Account Role</label>
                <select {...register('role')} className={'form-control'} disabled={!isAddMode}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {['admin', 'user'].map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
          </Paper>
        </div>

        {/* Submit and Reset button  */}
        <div className="col-xl-4">
          <Paper className="card">
            <div className="form-group">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="btn btn-primary"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Save
              </button>
              <button
                type="button"
                disabled={formState.isSubmitting}
                className="btn"
                onClick={onDelete}
              >
                Delete
              </button>
              <Link to={isAddMode ? '.' : '..'} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </Paper>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  // products: state.entities.products.list,
  // meta: state.entities.products.meta,
  // loading: state.entities.products.loading,
  accessToken: state.auth.accessToken,
});

export default connect(mapStateToProps, { addUser, updateUser, deleteUser })(
  UserAccountForm
);
