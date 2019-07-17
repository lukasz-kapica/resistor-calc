import React from 'react';
import PropTypes from 'prop-types';

import {valueAndColor, toleranceAndColor, multiplierAndColor} from '../lib/ColorCode';
import {pluckSecond} from '../lib/util';

export default function Bands({
  code,
  onCodeChange,
}) {
  const digitColors = pluckSecond(valueAndColor);
  const toleranceColors = pluckSecond(toleranceAndColor);
  const multiplierColors = pluckSecond(multiplierAndColor);

  return (
    <div className="Bands">
      {code.slice(0, code.length-2).map((color, index) => 
        <ColorSelect 
          key={index} 
          value={color}
          colors={digitColors}
          title={`Digit #${index+1}`} 
          onColorChange={(color) => handleCodeChange(color, index, code, onCodeChange)}
        />)}
        <ColorSelect 
          value={code[code.length-2]}
          title="Multiplier"
          colors={multiplierColors}
          onColorChange={(color) => handleCodeChange(color, code.length-2, code, onCodeChange)}
        />
        <ColorSelect 
          value={code[code.length-1]}
          title="Tolerance"
          colors={toleranceColors}
          onColorChange={(color) => handleCodeChange(color, code.length-1, code, onCodeChange)}
        />
    </div>
  );
}

Bands.propTypes = {
  code: PropTypes.array.isRequired,
  onCodeChange: PropTypes.func.isRequired,
};

function handleCodeChange(newColor, newIndex, oldCode, callback) {
  const newCode = [...oldCode];
  newCode[newIndex] = newColor;
  if (newCode.join(",") !== oldCode.join(",")) {
    callback(newCode);
  }
}

export function ColorSelect({
  value,
  onColorChange,
  title,
  colors,
}) {
  return (
    <div className="ColorSelect">
      <p className="ColorSelect__title">{title}</p>
      <select
        className="ColorSelect__colors"
        value={value}
        onChange={(e) => handleColorChange(e.target.value, value, onColorChange)}
      >
        {colors.map(color => <option key={color} value={color}>{color}</option>)}
      </select>
    </div>
  );
}

function handleColorChange(newValue, oldValue, callback) {
  if (newValue !== oldValue) { 
    callback(newValue);
  }
}

ColorSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
};
