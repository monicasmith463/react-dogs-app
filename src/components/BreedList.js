import React, { useState } from 'react';
import { capitalize, trim } from 'lodash';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { useFetchBreedImage } from './FetchImage';
import BreedImage from './BreedImage';

const BreedList = ({ breeds }) => {
  const [image, loading, error, setImage] = useFetchBreedImage();
  const [breed, setBreed] = useState({ breed: null, subbreed: null });

  const handleSelect = (item) => {
    setBreed(item)
    setImage(item)
  }

  const handleClose = () => {
    setBreed({ breed: null, subbreed: null })
  }

  return (
    <div>
    <List>
      {breeds.map(item => (
        <ListItem
          button
          key={`${item.breed}${item.subbreed}`}
          onClick={() => handleSelect(item) }
        >
          <ListItemText
            primary={trim(`${capitalize(item.subbreed)} ${capitalize(item.breed)}`)}
            primaryTypographyProps={{ color: 'textPrimary' }}
          />
        </ListItem>
      ))}
    </List>
    <Dialog
  fullWidth
  open={!!breed.breed}
  maxWidth="sm"
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
    <Button variant="contained" color="secondary" onClick={() => {
      setImage(breed)}}>
        Get another image
    </Button>
    <Button variant="contained" color="primary" onClick={() => handleClose()}>
      Close
    </Button>
  </DialogActions>
</Dialog>
</div>
  );
};

export default BreedList;
