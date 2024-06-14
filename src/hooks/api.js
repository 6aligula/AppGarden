// api.js

import axios from 'axios';

export const encenderMotor = async (seconds) => {
    const response = await axios.post(`/motor/abrir?seconds=${seconds}`);
    return response.data;
};

export const apagarMotor = async (seconds) => {
    const response = await axios.post(`/motor/cerrar?seconds=${seconds}`);
    return response.data;
};

export const getEstadoMotor = async () => {
    const response = await axios.get('/motor/estado');
    return response.data;
};
