// ApagarMotor.js

import React, { useState } from 'react';
import { apagarMotor } from '../hooks/api';
import { handleChange } from './utils';

const ApagarMotor = () => {
    const [seconds, setSeconds] = useState(0);
    const [response, setResponse] = useState(null);

    const handleApagar = async () => {
        const result = await apagarMotor(seconds);
        setResponse(result);
    };

    return (
        <div>
            <h2>Cerrar</h2>
            <p>Temporizador en segundos</p>
            <input
                type="number"
                value={seconds}
                onChange={handleChange(setSeconds, 1, 120)}
                placeholder="Segundos"
                min="1"
                max="120"
            />
            <button onClick={handleApagar}>Cerrar</button>
            {response && <p>{response.message}</p>}
        </div>
    );
};

export default ApagarMotor;
