import React, { useState } from 'react';

import Bands from './Bands';
import Resistance from './Resistance';
import ResistorSVG from './ResistorSVG';
import ESeries from './ESeries';

import {
  resistorToCode,
  codeToResistor,
  getMagnitude,
} from '../lib/ColorCode';

function Calculator() {

  const [code, setCode] = useState(["Brown", "Orange", "Black", "Black", "Gold"]);

  const resistor = codeToResistor(code);
  const {resistance, tolerance} = resistor;

  const handleResistorChange = (property) => (newValue) => {
    const newCode = resistorToCode({...resistor, [property]: newValue});
    setCode(newCode);
  };

  const handleCodeChange = (newCode) => setCode(newCode);

  const resistance_str = getMagnitude(resistance);

  return (
    <div className="Calculator">
      <h2 className="Calculator__resistor-info">{resistance_str}Ω ± {tolerance}%</h2>
      <ResistorSVG code={code} />
      <h3>Resistance</h3>
      <Resistance
        resistor={resistor}
        onBandsChange={handleResistorChange('bands')}
        onResistanceChange={handleResistorChange('resistance')}
        onToleranceChange={handleResistorChange('tolerance')}
      />
      <h3>Bands</h3>
      <Bands
        code={code}
        onCodeChange={handleCodeChange}
      />
      <h3>E-Series</h3>
      <ESeries resistance={resistance} />
    </div>
  );
}

export default Calculator;
