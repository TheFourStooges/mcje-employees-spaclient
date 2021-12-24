import React, { useState } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { connect } from 'react-redux';
import { loadAssets, getAssets } from '../../store/assets';
import config from '../../config/config';

const ImageSelector = (props) => {
  const { selectedImages, setSelectedImages } = props;
  useState(() => {
    props.loadAssets(100, 1);
  }, []);

  return (
    <ImageList
      sx={{
        width: '100%',
        height: '100%',
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {props.assets.map((asset) => {
        const isSelected = !!selectedImages.find(
          (image) => image.id === asset.id
        );

        return (
          <ImageListItem key={asset.id} cols={1} rows={1}>
            <img
              src={`${config.serverHost}${asset.path}`}
              alt={asset.description}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={asset.description}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${asset.description}`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedImages(
                        selectedImages.filter((image) => image.id !== asset.id)
                      );
                    } else {
                      const selectedCopy = [...selectedImages];
                      selectedCopy.push(asset);
                      setSelectedImages(selectedCopy);
                    }
                  }}
                >
                  {isSelected ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

const mapStateToProps = (state) => ({
  assets: state.entities.assets.list,
  meta: state.entities.assets.meta,
  loading: state.entities.assets.loading,
});

export default connect(mapStateToProps, { loadAssets, getAssets })(
  ImageSelector
);
