import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  Box
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import BreedList from './BreedList';

function DisplayBreeds({ breeds }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [breedsPerPage] = useState(10);
  // Get current breeds
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);
  // Change page
  const totalPages = Math.ceil(breeds.length / breedsPerPage)

  const handleChange = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <Box style={{ marginTop: 50 }}>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
      <Typography gutterBottom color="textPrimary">Page {currentPage} of {totalPages}</Typography>
      <Pagination
        page={currentPage}
        count={totalPages}
        onChange={handleChange}
      />
      <BreedList breeds={currentBreeds} />
      </Container>
    </Box>
  );
}

DisplayBreeds.propTypes = {
  breeds: PropTypes.arrayOf(
    PropTypes.exact({
      breed: PropTypes.string.isRequired,
      subbreed: PropTypes.string
    })
  ).isRequired,
};

export default DisplayBreeds;
