// App.js

import React from 'react';
import EncenderMotor from '../components/EncenderMotor';
import ApagarMotor from '../components/ApagarMotor';
import EstadoMotor from '../components/EstadoMotor';

const App = () => {
    return (
        <div>
            <h1>Control de Motor</h1>
            <EncenderMotor />
            <ApagarMotor />
            <EstadoMotor />
        </div>
    );
};

export default App;
