import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import OrderView from '../../components/order-view/order-view.component';
import config from '../../config/config';

const OrderPage = (props) => {
  const { orderId } = useParams();
  // const [order, setOrder] = useState(null);
  
  // useEffect(() => {
  //   console.log('useEffect');
  //   // async function fetchData() {
  //   //   const resp = await axios.request({
  //   //     baseURL: config.baseUrl,
  //   //     url: `/order/${orderId}`,
  //   //     method: 'GET',
  //   //   });
  //   //   setOrder(resp);
  //   // }

  //   // fetchData();
  // }, []);

  return (
    <Container maxWidth="xl">
      <OrderView orderId={orderId} />
    </Container>
  );
};

export default OrderPage;
