import React from 'react';
import { useParams } from 'react-router-dom';
import UserAccountForm from '../../components/user-account-form/user-account-form.component';

const UserAccountAddPage = () => {
  return (
    <>
      <UserAccountForm></UserAccountForm>
    </>
  );
};

export default UserAccountAddPage;
