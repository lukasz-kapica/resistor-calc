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
      <th>
        <span className="d-none d-sm-inline">Figure #1</span>
        <span className="d-sm-none">Fig. #1</span>
      </th>
      <th>
        <span className="d-none d-sm-inline">Figure #2</span>
        <span className="d-sm-none">Fig. #2</span>
      </th>
      {bands === 5 && <th>
        <span className="d-none d-sm-inline">Figure #3</span>
        <span className="d-sm-none">Fig. #3</span>
      </th>}
      <th>
        <span className="d-none d-sm-inline">Multiplier</span>
        <span className="d-sm-none">Mul.</span>
      </th>
      {bands !== 3 && <th>
        <span className="d-none d-sm-inline">Tolerance</span>
        <span className="d-sm-none">Tol.</span>
      </th>}
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
