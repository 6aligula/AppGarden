import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = () => {
  const [data, setData] = useState({ mediana: [], timestamp: [], ultimas_temperaturas: [] });
  const [error, setError] = useState(null);

  const fetchData = async () => {
    console.log('Fetching data...');
    try {
      const response = await axios.get('/temperatura');
      const newData = response.data;
      console.log('New data from API:', newData);

      const updatedData = {
        mediana: newData.mediana,
        timestamp: newData.timestamp,
        ultimas_temperaturas: newData.ultimas_temperaturas,
      };

      console.log('Updated data before setting state:', updatedData);
      setData(updatedData);
      console.log('Updated data:', updatedData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { data, error };
};

export default useFetchData;
