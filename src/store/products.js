import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

// Action Creators and Reducers
const slice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    meta: [],
    loading: false,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },

    productsReceived: (products, action) => {
      products.list = action.payload.data;
      products.meta = action.payload.meta;
      products.loading = false;
    },

    productsRequestFailed: (products, action) => {
      products.loading = false;
    },

    // action => action handler
    productAdded: (products, action) => {
      products.push({
        id: action.payload.id,
        name: action.payload.name,
        slug: action.payload.slug,
        description: action.payload.description,
        isActive: action.payload.isActive,
        basePrice: action.payload.basePrice,
        quantity: action.payload.quantity,
        properties: action.payload.properties,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        deletedAt: action.payload.deletedAt,
        categoryId: action.payload.categoryId,
        assets: action.payload.assets,
      });
    },

    metaChanged: (products, action) => {

    }
  },
});

export const {
  productsRequested,
  productsReceived,
  productsRequestFailed,

  productAdded,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/product';

/**
 * Call backend, fetch Products list
 * Dispatch productsReceived (save to state) on success
 * Dispatch productsRequestFailed on failure
 * @returns
 */
export const loadProducts =
  (limit, page) =>
  (dispatch, getState) => {
    // console.log(limit, page);
    return dispatch(
      apiCallBegan({
        url,
        params: {
          limit,
          page,
        },
        onStart: productsRequested.type,
        onSuccess: productsReceived.type,
        onError: productsRequestFailed.type,
      })
    );
  };

// Selector

// Memoization

export const getProducts = createSelector(
  (state) => state.entities.products,
  (products) => products.list
);
