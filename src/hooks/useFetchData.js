import { useEffect, useState } from 'react';

const useFetchData = () => {
  const [data, setData] = useState({ humedad: [], mediana: [], timestamp: [], ultimas_temperaturas: [] });
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch('/temperatura')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(newData => {
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

        localStorage.setItem('data', JSON.stringify(updatedData));
        setData(updatedData);
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
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { data, error };
};

export default useFetchData;
