import React from 'react';
import { useParams } from 'react-router-dom';
import UserAccountForm from '../../components/user-account-form/user-account-form.component';

const UserAccountPage = () => {
  const { accountId } = useParams();
  return (
    <>
      <UserAccountForm id={accountId}></UserAccountForm>
    </>
  );
};

export default UserAccountPage;
