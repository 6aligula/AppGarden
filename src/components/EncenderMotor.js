import React, { useState } from 'react';
import { encenderMotor } from '../hooks/api';
import { handleChange } from './utils';

const EncenderMotor = () => {
    const [seconds, setSeconds] = useState(1);
    const [response, setResponse] = useState(null);

    const handleEncender = async () => {
        const result = await encenderMotor(seconds);
        setResponse(result);
    };

    return (
        <div>
            <h2>Abrir</h2>
            <p>Temporizador en segundos</p>
            <input
                type="number"
                value={seconds}
                onChange={handleChange(setSeconds, 1, 120)}
                placeholder="Segundos"
                min="1"
                max="120"
            />
            <button onClick={handleEncender}>Abrir</button>
            {response && <p>{response.message}</p>}
        </div>
    );
};

export default EncenderMotor;
