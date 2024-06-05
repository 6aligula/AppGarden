import { useEffect, useState } from 'react';

const useFetchData = () => {
  const [data, setData] = useState({ humedad: [], mediana: [], timestamp: [], ultimas_temperaturas: [] });
  const [error, setError] = useState(null);

  const fetchData = () => {
    console.log('Fetching data...');
    fetch('/temperatura')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(newData => {
        console.log('New data from API:', newData);
        const storedData = JSON.parse(localStorage.getItem('data')) || {
          humedad: [],
          mediana: [],
          timestamp: [],
          ultimas_temperaturas: [],
        };

        const updatedData = {
          humedad: [...storedData.humedad, newData.humedad],
          mediana: [...storedData.mediana, newData.mediana],
          timestamp: [...storedData.timestamp, ...newData.timestamp],
          ultimas_temperaturas: [...storedData.ultimas_temperaturas, ...newData.ultimas_temperaturas],
        };

        // Sincronizar longitudes
        const minLength = Math.min(
          updatedData.humedad.length,
          updatedData.mediana.length,
          updatedData.timestamp.length,
          updatedData.ultimas_temperaturas.length
        );

        const synchronizedData = {
          humedad: updatedData.humedad.slice(-minLength),
          mediana: updatedData.mediana.slice(-minLength),
          timestamp: updatedData.timestamp.slice(-minLength),
          ultimas_temperaturas: updatedData.ultimas_temperaturas.slice(-minLength),
        };

        console.log('Synchronized data before setting state:', synchronizedData);
        localStorage.setItem('data', JSON.stringify(synchronizedData));
        setData(synchronizedData);
        console.log('Updated data:', synchronizedData);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data')) || {
      humedad: [],
      mediana: [],
      timestamp: [],
      ultimas_temperaturas: [],
    };
    setData(storedData);
    console.log('Initial data from localStorage:', storedData);
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { data, error };
};

export default useFetchData;
