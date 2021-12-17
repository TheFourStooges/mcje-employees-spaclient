/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useSelector, useDispatch, connect } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../../store/products';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Fab, Typography } from '@mui/material';

import config from '../../config/config';
import attributesEnum from '../../config/attributesEnum';

const axios = require('axios');

// https://jasonwatmore.com/post/2020/10/14/react-hook-form-combined-add-edit-create-update-form-example
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
const ProductForm = (props) => {
  // If params has id defined => edit mode
  // const { history, match } = props;
  const navigate = useNavigate();
  const { id } = props;
  // Add mode = !Edit mode
  const isAddMode = !id;

  // const initialValues = {
  //   id: '',
  //   name: '',
  //   slug: '',
  //   description: '',
  //   basePrice: '',
  //   quantity: 0,
  //   //
  //   ringSize: '',
  //   chainType: '',
  //   claspType: '',
  //   backFinding: '',
  //   productType: '',
  //   gemType: '',
  //   stoneCut: '',
  //   metalType: '',
  //   pearlType: '',
  //   metalStamp: '',
  //   pearlColor: '',
  //   pearlShape: '',
  //   stoneColor: '',
  //   stoneShape: '',
  //   inscription: '',
  //   pearlLuster: '',
  //   settingType: '',
  //   materialType: [],
  //   sizePerPearl: '',
  //   stoneClarity: '',
  //   surfaceMarking: '',
  //   pearlUniformity: '',
  //   stringingMethod: '',
  //   //
  //   createdAt: '',
  //   updatedAt: '',
  //   deletedAt: null,
  //   categoryId: '',
  //   assets: [],
  // };

  const createValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required'),
    description: Yup.string(),
    isActive: Yup.boolean().default(true),
    // categoryId:
    basePrice: Yup.number().positive().required(),
    quantity: Yup.number().integer().required(),
    productType: Yup.string(),
    claspType: Yup.string(),
    chainType: Yup.string(),
    backFinding: Yup.string(),
    ringSize: Yup.string(),
    materialType: Yup.array().min(1),
    // material may be automatically generated? no need to send
    gemType: Yup.string(),
    stoneCut: Yup.string(),
    stoneColor: Yup.string(),
    stoneClarity: Yup.string(),
    stoneShape: Yup.string(),
    pearlType: Yup.string(),
    pearlColor: Yup.string(),
    pearlLuster: Yup.string(),
    pearlShape: Yup.string(),
    pearlUniformity: Yup.string(),
    surfaceMarking: Yup.string(),
    stringingMethod: Yup.string(),
    sizePerPearl: Yup.string(),
    settingType: Yup.string(),
    metalType: Yup.string(),
    metalStamp: Yup.string(),
    inscription: Yup.string(),
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
    const {
      gemType,
      ringSize,
      stoneCut,
      chainType,
      claspType,
      metalType,
      pearlType,
      metalStamp,
      pearlColor,
      pearlShape,
      stoneColor,
      stoneShape,
      backFinding,
      inscription,
      pearlLuster,
      productType,
      settingType,
      materialType,
      sizePerPearl,
      stoneClarity,
      surfaceMarking,
      pearlUniformity,
      stringingMethod,
      ...restOfBody
    } = fields;

    const newBody = {
      ...restOfBody,
      properties: {
        gemType,
        ringSize,
        stoneCut,
        chainType,
        claspType,
        metalType,
        pearlType,
        metalStamp,
        pearlColor,
        pearlShape,
        stoneColor,
        stoneShape,
        backFinding,
        inscription,
        pearlLuster,
        productType,
        settingType,
        materialType,
        sizePerPearl,
        stoneClarity,
        surfaceMarking,
        pearlUniformity,
        stringingMethod,
      },
    };

    if (isAddMode) {
      console.log(isAddMode, newBody);
      props.addProduct(newBody);
    } else {
      props.updateProduct(id, newBody);
      console.log(isAddMode, newBody);
    }
    window.alert('Dispatched request');
  };

  const onDelete = () => {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      props.deleteProduct(id);
      navigate('..');
    }
  };

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!isAddMode) {
      // get product and set form fields
      axios
        .request({
          baseURL: config.baseUrl,
          url: `/product/${id}`,
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
            'name',
            'slug',
            'description',
            'isActive',
            'basePrice',
            'quantity',
          ];
          // Set form values
          firstLevel.forEach((field) => setValue(field, data[field]));

          const propertiesLevel = [
            'gemType',
            'ringSize',
            'stoneCut',
            'chainType',
            'claspType',
            'metalType',
            'pearlType',
            'metalStamp',
            'pearlColor',
            'pearlShape',
            'stoneColor',
            'stoneShape',
            'backFinding',
            'inscription',
            'pearlLuster',
            'productType',
            'settingType',
            'materialType',
            'sizePerPearl',
            'stoneClarity',
            'surfaceMarking',
            'pearlUniformity',
            'stringingMethod',
          ];
          propertiesLevel.forEach((field) =>
            setValue(field, data['properties'][field])
          );

          setProduct(data);
        });
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>

        <div>
          <div className="row">
            <div className="form-group col">
              <label>Product Name</label>
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
            <div className="form-group col">
              <label>Quantity</label>
              <input
                {...register('quantity')}
                type="number"
                className={`form-control`}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col">
              <label>Description</label>
              <textarea
                {...register('description')}
                className={'form-control'}
              />
            </div>
          </div>
        </div>

        <br />

        <div>
          <div className="row">
            <div className="form-group col">
              <label>Base Price</label>
              <input
                {...register('basePrice')}
                type="number"
                step="0.1"
                className={'form-control'}
              />
            </div>
          </div>
        </div>

        <br />

        <div>
          <div className="row">
            <div className="form-group col">
              <label>Product Type</label>
              <select {...register('productType')} className={'form-control'}>
                <option hidden disabled selected value>
                  {' '}
                  -- select an option --{' '}
                </option>
                {attributesEnum.productType.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col">
              <label>Clasp Type</label>
              <select {...register('claspType')} className={'form-control'}>
                <option hidden disabled selected value>
                  {' '}
                  -- select an option --{' '}
                </option>
                {attributesEnum.claspType.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Chain Type</label>
              <select {...register('chainType')} className={'form-control'}>
                <option hidden disabled selected value>
                  {' '}
                  -- select an option --{' '}
                </option>
                {attributesEnum.chainType.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col">
              <label>Back Finding</label>
              <select {...register('backFinding')} className={'form-control'}>
                <option hidden disabled selected value>
                  {' '}
                  -- select an option --{' '}
                </option>
                {attributesEnum.backFinding.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Ring Size</label>
              <select {...register('ringSize')} className={'form-control'}>
                <option hidden disabled selected value>
                  {' '}
                  -- select an option --{' '}
                </option>
                {attributesEnum.ringSize.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <br />

        <div>
          <div className="row">
            <div className="form-group col">
              <label>Material Type</label>
              <select
                {...register('materialType')}
                multiple
                className={'form-control'}
              >
                <option hidden disabled selected value>
                  {' '}
                  -- select an option --{' '}
                </option>
                {attributesEnum.materialType.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
          </div>

          <br />

          <div>
            <div className="row">
              <div className="form-group col">
                <label>Gem Type</label>
                <select {...register('gemType')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.gemType.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label>Stone Cut</label>
                <select {...register('stoneCut')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.stoneCut.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Stone Color</label>
                <select {...register('stoneColor')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.stoneColor.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label>Stone Clarity</label>
                <select
                  {...register('stoneClarity')}
                  className={'form-control'}
                >
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.stoneClarity.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Stone Shape</label>
                <select {...register('stoneShape')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.stoneShape.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="row">
              <div className="form-group col">
                <label>Pearl Type</label>
                <select {...register('pearlType')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.pearlType.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label>Pearl Color</label>
                <select {...register('pearlColor')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.pearlColor.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Pearl Luster</label>
                <select {...register('pearlLuster')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.pearlLuster.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label>Pearl Shape</label>
                <select {...register('pearlShape')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.pearlShape.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Pearl Uniformity</label>
                <select
                  {...register('pearlUniformity')}
                  className={'form-control'}
                >
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.pearlUniformity.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label>Surface Marking</label>
                <select
                  {...register('surfaceMarking')}
                  className={'form-control'}
                >
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.surfaceMarking.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Stringing Method</label>
                <select
                  {...register('stringingMethod')}
                  className={'form-control'}
                >
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.stringingMethod.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label>Size Per Pearl</label>
                <select
                  {...register('sizePerPearl')}
                  className={'form-control'}
                >
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.sizePerPearl.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Setting Type</label>
                <select {...register('settingType')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.settingType.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Metal Type</label>
                <select {...register('metalType')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.metalType.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col">
                <label>Metal Stamp</label>
                <select {...register('metalStamp')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.metalStamp.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Inscription</label>
                <select {...register('inscription')} className={'form-control'}>
                  <option hidden disabled selected value>
                    {' '}
                    -- select an option --{' '}
                  </option>
                  {attributesEnum.inscription.map((selection, idx) => (
                    <option key={selection}>{selection}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* // End */}
        </div>

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
    </Container>
  );
};

// const mapStateToProps = (state) => ({
//   products: state.entities.products.list,
//   meta: state.entities.products.meta,
//   loading: state.entities.products.loading,
// });

export default connect(null, { addProduct, updateProduct, deleteProduct })(
  ProductForm
);
