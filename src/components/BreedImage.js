import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';

function BreedImage({
  loading,
  error,
  breed,
  image,
}) {
  if (loading) return <Alert severity="info">Loading image...</Alert>;
  if (error) return <Alert severity="error">There was a problem loading the image</Alert>;
  return <img src={image} alt={breed} style={{ width: '100%', maxWidth: '100%' }} />;
}

BreedImage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  breed: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default BreedImage;
