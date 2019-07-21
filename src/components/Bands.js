import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {digitColors, toleranceColors, multiplierColors} from '../lib/ColorCode';

export default function Bands({
  code,
  onCodeChange,
}) {

  const handleCodeChange = (index) => (color) => {
    const newCode = [...code];
    newCode[index] = color;
    if (!_.isEqual(code, newCode)) {
      onCodeChange(newCode);
    }
  };

  return (
    <div className="Bands">
      {code.slice(0, code.length-2).map((color, index) => 
        <ColorSelect 
          key={index} 
          value={color}
          colors={digitColors}
          title={`Digit #${index+1}`} 
          onColorChange={handleCodeChange(index)}
        />)}
      <ColorSelect
        value={code[code.length-2]}
        title="Multiplier"
        colors={multiplierColors}
        onColorChange={handleCodeChange(code.length-2)}
      />
      <ColorSelect
        value={code[code.length-1]}
        title="Tolerance"
        colors={toleranceColors}
        onColorChange={handleCodeChange(code.length-1)}
      />
    </div>
  );
}

Bands.propTypes = {
  code: PropTypes.array.isRequired,
  onCodeChange: PropTypes.func.isRequired,
};

export function ColorSelect({
  value,
  onColorChange,
  title,
  colors,
}) {

  const handleColorChange = (newValue) =>
    newValue !== value && onColorChange(newValue);

  return (
    <div className="ColorSelect">
      <p className="ColorSelect__title">{title}</p>
      <select
        className="ColorSelect__colors"
        value={value}
        onChange={(e) => handleColorChange(e.target.value)}
      >
        {colors.map(color => <option key={color} value={color}>{color}</option>)}
      </select>
    </div>
  );
}

ColorSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
};
