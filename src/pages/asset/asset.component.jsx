import React from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import AssetForm from '../../components/asset-form/asset-form.component';

const AssetPage = () => {
  const { assetId } = useParams();

  return (
    <>
        <AssetForm id={assetId} />
    </>
  );
};

export default AssetPage;
