/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useSelector, useDispatch, connect } from 'react-redux';
import { addProduct, updateProduct } from '../../store/products';

import 'bootstrap/dist/css/bootstrap.min.css';

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

  const initialValues = {
    id: 'ea92d7eb-d867-4566-b4ba-1968e50e85fb',
    name: 'Incredible Fresh Chicken',
    slug: 'incredible-fresh-chicken-5855',
    description:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    isActive: true,
    basePrice: '595.00',
    quantity: 0,
    properties: {
      product: {
        ringSize: '11.5',
        chainType: 'franco',
        claspType: 'toggle-clasps',
        backFinding: 'omega-back',
        productType: 'FineNecklaceBraceletAnklet',
      },
      material: {
        gemType: 'sunstone-feldspar',
        stoneCut: 'ideal-cut',
        metalType: 'copper',
        pearlType: 'chinese-freshwater-cultured',
        metalStamp: '20k',
        pearlColor: 'pink',
        pearlShape: 'irregular',
        stoneColor: 'L',
        stoneShape: 'round-shape',
        inscription: 'no',
        pearlLuster: 'high-luster',
        settingType: 'guard-setting',
        materialType: ['metal', 'gemstone', 'pearl'],
        sizePerPearl: '8.0mm',
        stoneClarity: 'I',
        surfaceMarking: 'very-lightly-blemished',
        pearlUniformity: 'very-good',
        stringingMethod: 'unknotted-on-string',
      },
    },
    createdAt: '2021-12-15T18:27:29.724Z',
    updatedAt: '2021-12-15T18:27:29.724Z',
    deletedAt: null,
    categoryId: 'e8a69a8f-6da7-486b-a9f8-52f330f25dd2',
    assets: [],
  };

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
            <textarea {...register('description')} className={'form-control'} />
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
              {attributesEnum.claspType.map((selection, idx) => (
                <option key={selection}>{selection}</option>
              ))}
            </select>
          </div>
          <div className="form-group col">
            <label>Chain Type</label>
            <select {...register('chainType')} className={'form-control'}>
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
              {attributesEnum.backFinding.map((selection, idx) => (
                <option key={selection}>{selection}</option>
              ))}
            </select>
          </div>
          <div className="form-group col">
            <label>Ring Size</label>
            <select {...register('ringSize')} className={'form-control'}>
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
                {attributesEnum.gemType.map((selection, idx) => (
                  <option>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Stone Cut</label>
              <select {...register('stoneCut')} className={'form-control'}>
                {attributesEnum.stoneCut.map((selection, idx) => (
                  <option>{selection}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label>Stone Color</label>
              <select {...register('stoneColor')} className={'form-control'}>
                {attributesEnum.stoneColor.map((selection, idx) => (
                  <option>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Stone Clarity</label>
              <select {...register('stoneClarity')} className={'form-control'}>
                {attributesEnum.stoneClarity.map((selection, idx) => (
                  <option>{selection}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label>Stone Shape</label>
              <select {...register('stoneShape')} className={'form-control'}>
                {attributesEnum.stoneShape.map((selection, idx) => (
                  <option>{selection}</option>
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
                {attributesEnum.pearlType.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Pearl Color</label>
              <select {...register('pearlColor')} className={'form-control'}>
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
                {attributesEnum.pearlLuster.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Pearl Shape</label>
              <select {...register('pearlShape')} className={'form-control'}>
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
                {attributesEnum.stringingMethod.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Size Per Pearl</label>
              <select {...register('sizePerPearl')} className={'form-control'}>
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
                {attributesEnum.metalType.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
            <div className="form-group col">
              <label>Metal Stamp</label>
              <select {...register('metalStamp')} className={'form-control'}>
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
                {attributesEnum.inscription.map((selection, idx) => (
                  <option key={selection}>{selection}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* // End */}
      </div>

      {/* <div className="form-row">
        <div className="form-group col">
          <label>Title</label>
          <select
            name="title"
            ref={register}
            className={`form-control`}
          >
            <option value=""></option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
          </select>
          <div className="invalid-feedback"></div>
        </div>
        <div className="form-group col-5">
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            ref={register}
            className={`form-control`}
          />
          <div className="invalid-feedback"></div>
        </div>
        <div className="form-group col-5">
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            ref={register}
            className={`form-control`}
          />
          <div className="invalid-feedback"></div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-7">
          <label>Email</label>
          <input
            name="email"
            type="text"
            ref={register}
            className={`form-control`}
          />
          <div className="invalid-feedback"></div>
        </div>
        <div className="form-group col">
          <label>Role</label>
          <select
            name="role"
            ref={register}
            className={`form-control`}
          >
            <option value=""></option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="invalid-feedback"></div>
        </div>
      </div> */}

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

export default connect(null, { addProduct, updateProduct })(ProductForm);
