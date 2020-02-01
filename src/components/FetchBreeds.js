import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import DisplayBreeds from './DisplayBreeds';

const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';

function FetchBreeds() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(BREED_LIST_URL);
        console.log(response);
        // breed array should be in the following format:
        // [
        //   {
        //     breed: 'affenpinscher',
        //     subbreed: null,
        //   },
        //   {
        //     breed: 'hound',
        //     subbreed: 'afghan',
        //   },
        //   ...
        // ]
      } catch (e) {
        // error
      }
    };
    fetchBreeds();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ marginTop: 32 }}>
        <Alert severity="info">Loading...</Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" style={{ marginTop: 32 }}>
        <Alert severity="error">Error</Alert>
      </Container>
    );
  }

  return (
    <DisplayBreeds breeds={breeds} />
  );
}

export default FetchBreeds
