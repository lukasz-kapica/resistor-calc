import React from 'react';
import _ from 'lodash';

import {Chart as ch, colorNames, getMagnitude} from '../lib/ColorCode';

const THead = ({bands}) => (
  <thead>
    <tr>
      <th>Color</th>
      <th>Band #1</th>
      <th>Band #2</th>
      {bands === 5 && <th>Band #3</th>}
      <th>Multiplier</th>
      <th>Tolerance</th>
    </tr>
  </thead>
);

const TBody = ({
  code,
  onCodeChange,
}) => (
  <tbody>
  {colorNames.map((color) => {
    const {value, multiplier, tolerance} = ch[color];

    const isChecked = (index) =>
      (code[index] === color) ? 'is-checked' : '';

    const isClickable = (value) =>
      value !== undefined ? 'is-clickable' : '';

    const bands = code.length;

    const handleCodeChange = (index) => {
      const newCode = [...code];
      newCode[index] = color;
      onCodeChange(newCode);
    };

    return (
      <tr key={color} className={`is-${color.toLowerCase()}`}>
        <td>{color}</td>

        {_.times(bands-2, index => (
          <td key={index}
              className={`band ${isChecked(index)} ${isClickable(value)}`}
              onClick={(e) => value !== undefined && handleCodeChange(index)}
          >
            {value}
          </td>
        ))}

        <td className={`multiplier ${isChecked(bands-2)} ${isClickable(multiplier)}`}
            onClick={(e) => multiplier && handleCodeChange(bands-2)}>
          {multiplier && getMagnitude(multiplier) + 'Ω'}
        </td>
        <td className={`tolerance ${isChecked(bands-1)} ${isClickable(tolerance)}`}
            onClick={(e) => tolerance && handleCodeChange(bands-1)}>
          {tolerance && `± ${tolerance}%`}
        </td>
      </tr>
    );
  })}
  </tbody>
);

export default function Chart({
  code,
  onCodeChange,
}) {
  return (
    <div className="Chart d-flex align-items-center">
      <table>
        <THead bands={code.length} />
        <TBody code={code} onCodeChange={onCodeChange} />
      </table>
    </div>
  );
}
