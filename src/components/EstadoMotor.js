import React, { useState, useEffect, useRef } from 'react';
import MotorAnimation from './MotorAnimation';

const EstadoMotor = () => {
    const [estado, setEstado] = useState(null);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;
    const eventSourceRef = useRef(null);

    const connect = () => {
        //console.log('Estableciendo conexión con EventSource...');
        const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/motor/events`);

        eventSource.onopen = () => {
            //console.log('Conexión SSE abierta.');
            setIsConnected(true);
            setError(null);  // Reset error state on successful connection
            reconnectAttempts.current = 0;  // Reset reconnect attempts on successful connection
        };

        eventSource.onmessage = (event) => {
            //console.log('Mensaje recibido del servidor:', event.data);
            try {
                const parsedData = JSON.parse(event.data);
                //console.log('Parsed data:', parsedData);
                setEstado(parsedData);
            } catch (e) {
                //console.error('Error parsing JSON:', e);
                setError('Error parsing data from server');
            }
        };

        eventSource.onerror = () => {
            //console.error('Error en la conexión SSE. Intentando reconectar...');
            setIsConnected(false);
            eventSource.close();

            if (reconnectAttempts.current < maxReconnectAttempts) {
                setError(`Error en la conexión SSE. Intentando reconectar... (Intento ${reconnectAttempts.current + 1} de ${maxReconnectAttempts})`);
                reconnectAttempts.current += 1;
                setTimeout(() => {
                    connect();  // Retry connection
                }, 5000);  // Reintentar después de 5 segundos
            } else {
                setError('No se pudo establecer la conexión después de varios intentos. Por favor, inténtelo más tarde.');
            }
        };

        eventSourceRef.current = eventSource;
    };

    useEffect(() => {
        connect();

        return () => {
            if (eventSourceRef.current) {
                //console.log('Cerrando conexión SSE.');
                eventSourceRef.current.close();
            }
        };
    }, []);  // El array vacío asegura que se ejecuta solo una vez al montar el componente

    return (
        <div>
            <h2>Estado del Motor</h2>
            {estado && (
                <div>
                    <p>Estado actual: {`Estado: ${estado.state}, Duración: ${estado.duration} segundos`}</p>
                    <MotorAnimation state={estado.state} duration={estado.duration} />
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isConnected && !error && <p style={{ color: 'orange' }}>Conectando...</p>}
        </div>
    );
};

export default EstadoMotor;
