import { useState } from 'react';
import axios from 'axios';

export function useFetchBreedImage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [image, setImage] = useState('');

  const fetchBreedImage = async (breed) => {
    try {
      setLoading(true);
      setError(false);
      var breedString = (breed.breed && breed.subbreed) ? breed.breed + '/' + breed.subbreed : breed.breed
      const response = await axios.get(`https://dog.ceo/api/breed/${breedString}/images/random`);
      if (response.data.status !== 'success') {
        setLoading(false);
        setError(true);
      } else {
        setImage(response.data.message);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  return [image, loading, error, fetchBreedImage];
}
