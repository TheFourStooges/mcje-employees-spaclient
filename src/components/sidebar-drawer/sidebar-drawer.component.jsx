import React from 'react';

import { Link } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';

// import InventoryIcon from '@mui/icons-material/Inventory';

const Drawer = () => {
  const items = [
    { name: 'Orders', linkTo: '/orders' },
    { name: 'Products', linkTo: '/products' },
    { name: 'Categories', linkTo: '/categories' },
    { name: 'Customers', linkTo: '/customers' },
    { name: 'Shipping Methods', linkTo: '/shipping-methods' },
    { name: 'User Accounts', linkTo: '/accounts' },
  ];

  // console.log(items);

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {items.map(({ name, linkTo, icon }) => (
          <ListItem button component={Link} to={linkTo} key={name}>
            {/* <ListItemIcon children={icon} /> */}
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export default Drawer;
