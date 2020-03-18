import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import DisplayBreeds from './DisplayBreeds';

const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';

function FetchBreeds() {

  const [breeds, setBreeds] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoad(true);
        setError(false);
        const response = await axios.get(BREED_LIST_URL);
        if(response.data.status === 'success') {
          setLoad(false);
          let breeds = [];
          //I know there's a better way to do this parsing with various libraries, this is functional but perhaps not optimal:
          for(let b in response.data.message){
            let subbreeds = (response.data.message[b].length) ? response.data.message[b] : [null];
            for (let s in subbreeds) {
              breeds.push({breed: b,
                subbreed: subbreeds[s]
              })
            }
          }
          setBreeds(breeds);
        }
      } catch (e) {
        setLoad(false);
        setError(true);
      }
    };
    fetchBreeds();
  }, []);

  if (load) {
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

export default FetchBreeds;
