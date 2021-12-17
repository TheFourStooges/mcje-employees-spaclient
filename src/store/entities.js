import { combineReducers } from 'redux';
import productsReducer from './products';
import categoriesReducer from './categories';
import assetsReducer from './assets';
import ordersReducer from './orders';

export default combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  assets: assetsReducer,
  orders: ordersReducer,
});
