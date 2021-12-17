import { combineReducers } from 'redux';
import productsReducer from './products';
import categoriesReducer from './categories';
import assetsReducer from './assets';

export default combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  assets: assetsReducer,
});
