/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../store/categories';

import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from '@mui/material';

import config from '../../config/config';
// import attributesEnum from '../../config/attributesEnum';

const axios = require('axios');

// https://jasonwatmore.com/post/2020/10/14/react-hook-form-combined-add-edit-create-update-form-example
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
const CategoryForm = (props) => {
  // If params has id defined => edit mode
  // const { history, match } = props;
  const navigate = useNavigate();
  const { id } = props;
  // Add mode = !Edit mode
  const isAddMode = !id;

  const createValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required'),
    description: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // eslint-disable-next-line no-unused-vars
    getValues,
    // eslint-disable-next-line no-unused-vars
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(createValidationSchema),
  });

  const onSubmit = (fields) => {
    if (isAddMode) {
      // console.log(isAddMode, fields);
      props.addCategory(fields);
    } else {
      props.updateCategory(id, fields);
      // console.log(isAddMode, fields);
    }
    window.alert('Dispatched request');
  };

  const onDelete = () => {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      props.deleteCategory(id);
      navigate('..');
    }
  };

    // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (!isAddMode) {
      // get product and set form fields
      axios
        .request({
          baseURL: config.baseUrl,
          url: `/category/${id}`,
          method: 'GET',
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

          // console.log(data);

          const firstLevel = ['name', 'slug', 'description'];
          // Set form values
          firstLevel.forEach((field) => setValue(field, data[field]));

          setCategory(data);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <h1>{isAddMode ? 'Add Category' : 'Edit Category'}</h1>

      <div>
        <div className="row">
          <div className="form-group col">
            <label>Category Name</label>
            <input
              {...register('name')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Slug</label>
            <input
              {...register('slug')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Description</label>
            <textarea {...register('description')} className={'form-control'} />
          </div>
        </div>
      </div>

      {/* // End */}

      {/* Submit and Reset button  */}
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
    </form>
  );
};

// const mapStateToProps = (state) => ({
//   products: state.entities.products.list,
//   meta: state.entities.products.meta,
//   loading: state.entities.products.loading,
// });

export default connect(null, { addCategory, updateCategory, deleteCategory })(
  CategoryForm
);
