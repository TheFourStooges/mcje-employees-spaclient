/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useSelector, useDispatch, connect } from 'react-redux';
import {
  addShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
} from '../../store/shippingMethods';

import DataTable from '../data-table/data-table.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/sticky.scss';
import { Typography, Paper } from '@mui/material';

import {
  FormInputText,
  FormInputDropdown,
  FormInputMultiCheckbox,
} from '../form-components';

import config from '../../config/config';
import attributesEnum from '../../config/attributesEnum';

const axios = require('axios');

// https://jasonwatmore.com/post/2020/10/14/react-hook-form-combined-add-edit-create-update-form-example
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
const ShippingMethodForm = (props) => {
  const [shippingMethod, setShippingMethod] = useState({});
  // const [orders, setOrders] = useState([]);

  // If params has id defined => edit mode
  // const { history, match } = props;
  const navigate = useNavigate();
  const { id } = props;
  // Add mode = !Edit mode
  const isAddMode = !id;

  const createValidationSchema = Yup.object().shape({
    provider: Yup.string().required('Provider is required'),
    description: Yup.string(),
    price: Yup.number().positive(),
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
    const { description, provider, price, ...restOfBody } = fields;

    const newBody = { description, provider, price };

    if (isAddMode) {
      console.log(isAddMode, newBody);
      props.addShippingMethod(newBody);
    } else {
      props.updateShippingMethod(id, newBody);
      console.log(isAddMode, newBody);
    }
    window.alert('Dispatched request');
  };

  const onDelete = () => {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      props.deleteShippingMethod(id);
      navigate('..');
    }
  };

  useEffect(() => {
    if (!isAddMode) {
      // get product and set form fields
      axios
        .request({
          baseURL: config.baseUrl,
          url: `/shipping-method/${id}`,
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

          const firstLevel = ['description', 'provider', 'price'];
          // Set form values
          firstLevel.forEach((field) => setValue(field, data[field]));

          setShippingMethod(data);
        });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Typography variant="h5">
        {isAddMode ? 'Add Shipping Method' : 'Edit Shipping Method'}
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
                    name="provider"
                    control={control}
                    label="Provider"
                  />
                </div>
                <div className="form-group col">
                  <FormInputText
                    name="price"
                    control={control}
                    label="Price"
                    type="number"
                    inputProps={{ step: '0.01' }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col">
                  <FormInputText
                    name="description"
                    control={control}
                    label="Description"
                    multiline={true}
                  />
                </div>
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

export default connect(mapStateToProps, {
  addShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
})(ShippingMethodForm);
