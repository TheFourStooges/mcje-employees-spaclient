import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../config/config';
import { useSelector, connect } from 'react-redux';
import { getAccessToken } from '../../store/auth';
import { updateOrder } from '../../store/orders';
import FormInputText from '../form-components/FormInputText';
import './order-view.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsPane = ({ orderData }) => {
  console.log(orderData);

  const totalDiscounts = orderData?.orderItems
    .map((orderItem) => orderItem.discountPerItem * orderItem.quantity)
    .reduce((accum, currVal) => accum + currVal);
  // console.log(totalDiscounts);

  const totalPaid = orderData?.orderPayments
    .map((payment) => payment.amount)
    .reduce((accum, currVal) => accum + currVal);
  // console.log(totalPaid);

  return (
    <Paper className="card">
      <header className="card__header">
        <h5 style={{ display: 'inline' }}>Details</h5>
        <div style={{ display: 'inline' }}>
          <Button>Resend Receipt</Button>
        </div>
      </header>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ fontWeight: 'bold' }}>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Placed</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{orderData?.referenceNumber}</TableCell>
                <TableCell>{orderData?.createdAt}</TableCell>
                <TableCell>
                  {orderData?.paymentStatus} / {orderData?.fulfillmentStatus}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <br />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price/item</TableCell>
                <TableCell>Discount/item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData?.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product?.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.discountPerItem}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.lineTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <br />

        <TableContainer>
          <Table>
            {/* <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead> */}
            <TableBody>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell>{orderData?.subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discount</TableCell>
                <TableCell>{totalDiscounts}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipping Cost</TableCell>
                <TableCell>{orderData?.shipping}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{orderData?.total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell>{orderData?.tax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total with Tax</TableCell>
                <TableCell>{orderData?.totalWithTax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Paid</TableCell>
                <TableCell>{totalPaid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payable</TableCell>
                <TableCell>{orderData?.totalWithTax - totalPaid}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

const CustomerDetailsPane = ({ orderData, handleEdit }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const handleEditSubmit = (data) => {
    const updateBody = { customer: { name: data.name, email: data.email } };
    // console.log(updateBody);
    setDialogOpen(false);
    handleEdit(updateBody);
  };

  console.log(orderData?.customer);

  const EditCustomerDialog = ({ onSubmit, onClose, defaultValues }) => {
    // console.log('default values', defaultValues);
    const methods = useForm({ defaultValues: { ...defaultValues } });
    const { handleSubmit, reset, control, setValue } = methods;

    return (
      <Dialog open={dialogOpen} onClose={onClose}>
        <DialogTitle>Edit Customer Detail</DialogTitle>
        <DialogContent
          style={{
            display: 'grid',
            gridRowGap: '20px',
            padding: '20px',
            // margin: '10px 300px'
          }}
        >
          <FormInputText name="name" control={control} label="Customer Name" />
          <FormInputText name="email" control={control} label="Email address" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <Paper className="card">
        <header className="card__header">
          <h5>Customer</h5>
          <Button onClick={handleClickOpen}>Update</Button>
        </header>
        <div>
          <p className="primary-text">{orderData?.customer?.name}</p>
          <p>{orderData?.customer?.email}</p>
        </div>
      </Paper>

      <EditCustomerDialog
        onSubmit={handleEditSubmit}
        onClose={handleClose}
        defaultValues={orderData?.customer}
      />
    </>
  );
};

const ShippingAddressPane = ({ orderData, handleEdit }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const handleEditSubmit = (data) => {
    const updateBody = {
      shippingAddress: {
        city: data.city,
        name: data.name,
        ward: data.ward,
        phone: data.phone,
        country: data.country,
        district: data.district,
        postalCode: data.postalCode,
        streetLine1: data.streetLine1,
      },
    };
    // console.log('Update Body', updateBody);
    setDialogOpen(false);
    handleEdit(updateBody);
  };

  console.log(orderData?.shippingAddress);

  const EditShippingAddressDialog = ({ onSubmit, onClose, defaultValues }) => {
    console.log('default values', defaultValues);
    const methods = useForm({ defaultValues: { ...defaultValues } });
    const { handleSubmit, reset, control, setValue } = methods;

    return (
      <Dialog open={dialogOpen} onClose={onClose}>
        <DialogTitle>Edit Shipping Address</DialogTitle>
        <DialogContent
          style={{
            display: 'grid',
            gridRowGap: '20px',
            padding: '20px',
            // margin: '10px 300px'
          }}
        >
          <FormInputText name="name" control={control} label="Customer Name" />
          <FormInputText name="phone" control={control} label="Email address" />
          <FormInputText
            name="streetLine1"
            control={control}
            label="Street Line"
          />
          <FormInputText name="ward" control={control} label="Ward" />
          <FormInputText name="district" control={control} label="District" />
          <FormInputText name="city" control={control} label="City" />
          <FormInputText
            name="postalCode"
            control={control}
            label="Postal Code"
          />
          <FormInputText name="country" control={control} label="Country" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <Paper className="card">
        <header className="card__header">
          <h5>Shipping Address</h5>
          <Button onClick={handleClickOpen}>Update</Button>
        </header>
        <div>
          <p className="primary-text">{orderData?.shippingAddress?.name}</p>
          <p>
            <div>{orderData?.shippingAddress?.phone}</div>
            <div>{orderData?.shippingAddress?.streetLine1}</div>
            <div>{orderData?.shippingAddress?.ward}</div>
            <div>{orderData?.shippingAddress?.district}</div>
            <div>{orderData?.shippingAddress?.city}</div>
            <div>{orderData?.shippingAddress?.postalCode}</div>
            <div>{orderData?.shippingAddress?.country}</div>
          </p>
        </div>
      </Paper>

      <EditShippingAddressDialog
        onSubmit={handleEditSubmit}
        onClose={handleClose}
        defaultValues={orderData?.shippingAddress}
      />
    </>
  );
};

const FulfillmentsPane = ({ orderData }) => {
  // console.log(orderData);
  return (
    <Paper className="card">
      <header className="card__header">
        <h5>Fulfillments</h5>
      </header>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Carrier / Tracking No.</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData?.orderFulfillments?.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.description}</TableCell>
                <TableCell>
                  {f.carrier} {f.trackingNumber}
                </TableCell>
                <TableCell>{f.type}</TableCell>
                <TableCell>{f.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const PaymentsPane = ({ orderData }) => {
  return (
    <Paper className="card">
      <header className="card__header">
        <h5>Payments</h5>
      </header>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData?.orderPayments?.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.transactionId}</TableCell>
                <TableCell>
                  {p.amount} {p.currency}
                </TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell>{p.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const OrderView = ({ orderId, accessToken, updateOrder }) => {
  console.log(orderId);
  // const { referenceNumber, createdAt, fulfillmentStatus, paymentStatus } =
  //   orderData;

  const [order, setOrder] = useState(null);

  const fetchData = async () => {
    const resp = await axios.request({
      baseURL: config.baseUrl,
      url: `/order/${orderId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Fetched order');
    setOrder(resp.data);
  };

  const handleOrderUpdate = (updateBody) => {
    updateOrder(orderId, updateBody).then(() => fetchData());
    console.log('Updated order');
  };

  useEffect(() => {
    console.log('OrderView mounted');

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-8">
        <DetailsPane orderData={order} />
        <FulfillmentsPane orderData={order} />
        <PaymentsPane orderData={order} />
      </div>
      <div className="col-lg-4">
        <CustomerDetailsPane orderData={order} handleEdit={handleOrderUpdate} />
        <ShippingAddressPane orderData={order} handleEdit={handleOrderUpdate} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});
export default connect(mapStateToProps, { getAccessToken, updateOrder })(
  OrderView
);
