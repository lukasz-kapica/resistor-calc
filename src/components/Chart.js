import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {TH} from './shared';

import {chart, colorNames} from '../lib/chart';
import {bandsToDigits, bandsToTolerances} from '../lib/resistor';
import {magnitude} from "../lib/utils";

import styles from '../styles/Chart.module.css';

const THead = ({bands}) => (
  <thead>
    <tr className='text-center'>
      <th className="d-none d-sm-table-cell">Color</th>
      <TH full='Figure #1' abbr='Fig. #1' />
      <TH full='Figure #2' abbr='Fig. #2' />
      {bands === 5  &&
        <TH full='Figure #3' abbr='Fig. #3' />}
      <TH full='Multiplier' abbr='Mul.' />
      {bands !== 3 &&
        <TH full='Tolerance' abbr='Tol.' />}
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

    const isChecked = index => (code[index] === color) ? styles.checked : '';

    const isClickable = value => (value !== undefined) ? styles.clickable : '';

    const bands = code.length;
    const digits = bandsToDigits(bands);

    const handleCodeChange = index => {
      const newCode = [...code];
      newCode[index] = color;
      onCodeChange(newCode);
    };

    const FiguresTDs = () => _.times(digits, index => (
      <td key={index}>
        <div className={`${styles.cell} text-center ${isChecked(index)} ${isClickable(value)}`}
             onClick={() => value !== undefined && handleCodeChange(index)}>
          {value}
        </div>
      </td>
    ));

    const MultiplierTD = () => (
      <td>
        <div className={`${styles.cell} text-center ${isChecked(digits)} ${isClickable(multiplier)}`}
             onClick={() => multiplier && handleCodeChange(digits)}>
          {multiplier && magnitude(multiplier) + 'Ω'}
        </div>
      </td>
    );

    const ToleranceTD = () => (
      <td>
        {bandsToTolerances[bands].includes(tolerance) &&
        <div className={`${styles.cell} ${isChecked(digits+1)} ${isClickable(tolerance)}`}
             onClick={() => tolerance && handleCodeChange(digits+1)} >
          {tolerance && `± ${tolerance}%`}
        </div>}
      </td>
    );

    return (
      <tr key={color} className={`is-${color.toLowerCase()}`}>
        <td className="pl-3 d-none d-sm-table-cell">{color}</td>
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
      <table  className="w-100">
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
