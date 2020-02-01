import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { capitalize, trim } from 'lodash';
import {
  Container,
  Typography,
  ButtonGroup,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import BreedImage from './BreedImage';
import { useFetchBreedImage } from './FetchImage';


function DisplayBreeds({ breeds }) {
  const [page, setPage] = useState(1);
  const [breed, setBreed] = useState({ breed: null, subbreed: null });
  const [image, loading, error, setImage] = useFetchBreedImage();

  const totalPages = 1;

  return (
    <Box style={{ marginTop: 50 }}>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <Typography gutterBottom color="textPrimary">Page {page} of {totalPages}</Typography>
        <ButtonGroup variant="contained" color="primary">
          <Button onClick={() => null}>
            Prev
          </Button>
          <Button onClick={() => null}>
            Next
          </Button>
        </ButtonGroup>
        <List>
          {breeds.map(item => (
            <ListItem 
              button
              key={`${item.breed}${item.subbreed}`}
              onClick={() => null}
            >
              <ListItemText 
                primary={trim(`${capitalize(item.subbreed)} ${capitalize(item.breed)}`)} 
                primaryTypographyProps={{ color: 'textPrimary' }}
              />
            </ListItem>
          ))}
        </List>
      </Container>

      <Dialog 
        fullWidth
        open={!!breed.breed}
        maxWidth="sm"
        onClose={() => null}
      >
        <DialogTitle>{trim(`${capitalize(breed.subbreed)} ${capitalize(breed.breed)}`)}</DialogTitle>
        <DialogContent>
          <BreedImage
            loading={loading}
            error={error}
            image={image}
            breed={breed}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={() => null}>
              Get another image
          </Button>
          <Button variant="contained" color="primary" onClick={() => null}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
