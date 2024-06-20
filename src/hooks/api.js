// api.js

import axios from 'axios';

export const encenderMotor = async (seconds) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/motor/abrir?seconds=${seconds}`);
    return response.data;
};

export const apagarMotor = async (seconds) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/motor/cerrar?seconds=${seconds}`);
    return response.data;
};

export const getEstadoMotor = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/motor/estado`);
    return response.data;
};
