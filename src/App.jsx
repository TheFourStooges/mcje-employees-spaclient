import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useSelector, useDispatch, connect } from 'react-redux';
import { loadUser } from './store/auth';

import PrivateOutlet from './common/PrivateOutlet';

import DashboardPage from './pages/dashboard/dashboard.component';

import ProductsPage from './pages/products/products.component';
import ProductPage from './pages/product/product.component';
import ProductsListPage from './pages/products-list/products-list.components';
import ProductAddPage from './pages/product-add/product-add.component';

import CategoriesPage from './pages/categories/categories.component';
import CategoryPage from './pages/category/category.component';
import CategoryAdd from './pages/category-add/category-add.component';
import CategoriesListPage from './pages/categories-list/categories-list.component';

import LoginPage from './pages/login/login.component';
import OrdersPage from './pages/orders/orders.component';
import OrderPage from './pages/order/order.component';
import OrdersListPage from './pages/orders-list/orders-list.component';
import CustomersPage from './pages/customers/customers.component';
import CustomerPage from './pages/customer/customer.component';
import CustomersListPage from './pages/customers-list/customers-list.component';

function App(props) {
  useEffect(() => {
    props.loadUser();
  }, []);

  // https://reactrouter.com/docs/en/v6/getting-started/overview
  // https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route index element={<DashboardPage />} />

          <Route path="products" element={<ProductsPage />}>
            <Route path=":productId" element={<ProductPage />} />
            <Route path="add" element={<ProductAddPage />} />
            <Route index element={<ProductsListPage />} />
          </Route>

          <Route path="categories" element={<CategoriesPage />}>
            <Route path=":categoryId" element={<CategoryPage />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route index element={<CategoriesListPage />} />
          </Route>

          <Route path="orders" element={<OrdersPage />}>
            <Route path=":orderId" element={<OrderPage />} />
            <Route index element={<OrdersListPage />} />
          </Route>

          <Route path="customers" element={<CustomersPage />}>
            <Route path=":customerId" element={<CustomerPage />} />
            <Route index element={<CustomersListPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default connect(null, { loadUser })(App);
