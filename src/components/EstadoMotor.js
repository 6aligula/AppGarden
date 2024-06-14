import React, { useState, useEffect } from 'react';

const EstadoMotor = () => {
    const [estado, setEstado] = useState(null);

    useEffect(() => {
        console.log('Estableciendo conexión con EventSource...');
        const eventSource = new EventSource('http://192.168.140.170:5000/motor/events');

        eventSource.onopen = () => {
            console.log('Conexión SSE abierta.');
        };

        eventSource.onmessage = (event) => {
            console.log('Mensaje recibido del servidor:', event.data);
            setEstado(event.data);
        };

        eventSource.onerror = (error) => {
            console.error('Error en la conexión SSE:', error);
            eventSource.close();
        };

        return () => {
            console.log('Cerrando conexión SSE.');
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h2>Estado del Motor</h2>
            {estado && <p>{estado}</p>}
        </div>
    );
};

export default EstadoMotor;
