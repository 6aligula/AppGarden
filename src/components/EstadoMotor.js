// EstadoMotor.js

import React, { useState, useEffect } from 'react';
import { getEstadoMotor } from '../hooks/api';

const EstadoMotor = () => {
    const [estado, setEstado] = useState(null);

    const fetchEstado = async () => {
        const result = await getEstadoMotor();
        setEstado(result);
    };

    useEffect(() => {
        fetchEstado();
    }, []);

    return (
        <div>
            <h2>Estado del Motor</h2>
            <button onClick={fetchEstado}>Actualizar Estado</button>
            {estado && <p>{estado.state || estado.error}</p>}
        </div>
    );
};

export default EstadoMotor;
