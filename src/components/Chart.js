import React from 'react';
import _ from 'lodash';

import {Chart as ch, colorNames} from '../lib/ColorCode';
import {getMagnitude} from "../lib/utils";

const THead = ({bands}) => (
  <thead>
    <tr>
      <th className="d-none d-sm-table-cell">Color</th>
      <th>Figure #1</th>
      <th>Figure #2</th>
      {bands === 5 && <th>Figure #3</th>}
      <th>Multiplier</th>
      {bands !== 3 && <th>Tolerance</th>}
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

    const len = code.length;
    const digits = len === 5 ? 3 : 2;

    const handleCodeChange = (index) => {
      const newCode = [...code];
      newCode[index] = color;
      onCodeChange(newCode);
    };

    return (
      <tr key={color} className={`is-${color.toLowerCase()}`}>
        <td className="d-none d-sm-table-cell">{color}</td>

        {_.times(digits, index => (
          <td key={index}
          >
            <div className={`inner noselect band ${isChecked(index)} ${isClickable(value)}`}
                 onClick={() => value !== undefined && handleCodeChange(index)}>
              {value}
            </div>
          </td>
        ))}

        <td>
          <div className={`inner noselect multiplier ${isChecked(digits)} ${isClickable(multiplier)}`}
               onClick={() => multiplier && handleCodeChange(digits)}>
            {multiplier && getMagnitude(multiplier) + 'Ω'}
          </div>
        </td>
        {len !== 3 && <td>
          <div className={`inner noselect ${isChecked(digits+1)} ${isClickable(tolerance)}`}
               onClick={() => tolerance && handleCodeChange(digits+1)}
          >
            {tolerance && `± ${tolerance}%`}
          </div>
        </td>}
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
