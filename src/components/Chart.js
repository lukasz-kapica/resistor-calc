import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {chart, colorNames} from '../lib/chart';
import {bandsToDigits, bandsToTolerances} from '../lib/resistor';
import {magnitude} from "../lib/utils";

import '../styles/Chart.css';

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
    const {value, multiplier, tolerance} = chart[color];

    const isChecked = index => (code[index] === color) ? 'is-checked' : '';

    const isClickable = value => (value !== undefined) ? 'is-clickable' : '';

    const bands = code.length;
    const digits = bandsToDigits(bands);

    const handleCodeChange = index => {
      const newCode = [...code];
      newCode[index] = color;
      onCodeChange(newCode);
    };

    const FiguresTDs = () => _.times(digits, index => (
      <td key={index}>
        <div className={`inner band ${isChecked(index)} ${isClickable(value)}`}
             onClick={() => value !== undefined && handleCodeChange(index)}>
          {value}
        </div>
      </td>
    ));

    const MultiplierTD = () => (
      <td>
        <div className={`inner multiplier ${isChecked(digits)} ${isClickable(multiplier)}`}
             onClick={() => multiplier && handleCodeChange(digits)}>
          {multiplier && magnitude(multiplier) + 'Ω'}
        </div>
      </td>
    );

    const ToleranceTD = () => (
      <td>
        {bandsToTolerances[bands].includes(tolerance) &&
        <div className={`inner ${isChecked(digits+1)} ${isClickable(tolerance)}`}
             onClick={() => tolerance && handleCodeChange(digits+1)} >
          {tolerance && `± ${tolerance}%`}
        </div>}
      </td>
    );

    return (
      <tr key={color} className={`is-${color.toLowerCase()}`}>
        <td className="d-none d-sm-table-cell">{color}</td>
        <FiguresTDs />
        <MultiplierTD />
        {bands !== 3 && <ToleranceTD />}
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

Chart.propTypes = {
  code: PropTypes.array.isRequired,
  onCodeChange: PropTypes.func.isRequired,
};
