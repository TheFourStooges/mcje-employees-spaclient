/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { addAsset, updateAsset, deleteAsset } from '../../store/assets';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Paper, Typography } from '@mui/material';

import config from '../../config/config';
// import attributesEnum from '../../config/attributesEnum';

const axios = require('axios');

// https://jasonwatmore.com/post/2020/10/14/react-hook-form-combined-add-edit-create-update-form-example
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
const AssetForm = (props) => {
  // If params has id defined => edit mode
  // const { history, match } = props;
  const navigate = useNavigate();
  const { id } = props;
  // Add mode = !Edit mode
  const isAddMode = !id;

  const createValidationSchema = Yup.object().shape({
    description: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(createValidationSchema),
  });

  const onSubmit = (fields) => {
    console.log('onSubmit', fields, formState);
    const { description, productId, image } = fields;

    if (isAddMode) {
      let fd = new FormData();
      fd.append('description', description);
      fd.append('image', image[0]);
      // https://stackoverflow.com/questions/49579640/how-to-send-data-correct-axios-error-multipart-boundary-not-found
      // console.log(isAddMode, fields);
      props.addAsset(fd);
    } else {
      props.updateAsset(id, { description });
      // console.log(isAddMode, fields);
    }
    if (formState.isSubmitSuccessful) {
      window.alert(`Created/Modified asset successful`);
      reset();
    }
  };

  const onDelete = () => {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      props.deleteAsset(id);
      navigate('..');
    }
  };

  const [asset, setAsset] = useState({});

  useEffect(() => {
    if (!isAddMode) {
      // get product and set form fields
      axios
        .request({
          baseURL: config.baseUrl,
          url: `/asset/${id}`,
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

          const firstLevel = [
            'url',
            'path',
            'description',
            'filename',
            'fileSize',
          ];
          // Set form values
          firstLevel.forEach((field) => setValue(field, data[field]));

          setAsset(data);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <Typography variant="h5">
          {isAddMode ? 'Add Asset' : 'Edit Asset'}
        </Typography>

        <Paper className="card">
          <div className="row">
            <div className="form-group col">
              <label>URL</label>
              <input
                {...register('url')}
                type="text"
                readOnly
                className={`form-control`}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label>Path</label>
              <input
                {...register('path')}
                type="text"
                readOnly
                className={`form-control`}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col">
              <label>File Name</label>
              <input
                {...register('filename')}
                type="text"
                readOnly
                className={`form-control`}
              />
            </div>
            <div className="form-group col">
              <label>File Size</label>
              <input
                {...register('fileSize')}
                type="text"
                readOnly
                className={`form-control`}
              />
            </div>
          </div>
        </Paper>

        <Paper className="card">
          <div className="row">
            <div className="form-group col">
              <label>Description</label>
              <textarea
                {...register('description')}
                className={'form-control'}
              />
            </div>
          </div>
        </Paper>

        <Paper className="card">
          <div style={{ width: '75%' }}>
            <img
              src={asset.url ? asset.url : config.serverHost + asset.path}
              alt={asset.description}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
          <div className="row">
            <div className="form-group col">
              <label>Image Upload: </label>
              <input {...register('image')} type="file" disabled={!isAddMode} />
            </div>
          </div>
        </Paper>

        {/* // End */}

        {/* Submit and Reset button  */}
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
      </form>
    </>
  );
};

// const mapStateToProps = (state) => ({
//   products: state.entities.products.list,
//   meta: state.entities.products.meta,
//   loading: state.entities.products.loading,
// });

export default connect(null, { addAsset, updateAsset, deleteAsset })(AssetForm);
