import React from 'react';
import { useParams } from 'react-router-dom';
import AssetForm from '../../components/asset-form/asset-form.component';

const AssetPage = () => {
  const { assetId } = useParams();

  return (
    <>
      <AssetForm id={assetId} />
    </>
  );
}

export default AssetPage
