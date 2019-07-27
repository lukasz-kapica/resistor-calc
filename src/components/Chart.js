import React from 'react';

import {Chart as ch, colorNames, getMagnitude} from '../lib/ColorCode';

export default function Chart({code}) {
  const bands = code.length;
  return (
    <div className="Chart">
      <h3>Resistor Color Chart</h3>
      <table>
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
        <tbody>
          {colorNames.map((color) => {
            const {value, multiplier, tolerance} = ch[color];
            const className = `is-${color.toLocaleLowerCase()}`;

            const isChecked = (index) => {
              if (code[index] === color) {
                return 'is-checked';
              }
              return '';
            };

            return (
              <tr key={color} className={className}>
                <td style={{padding: '0 10px'}}>{color}</td>
                <td className={isChecked(0)} style={{textAlign: 'center'}}>{value}</td>
                <td className={isChecked(1)} style={{textAlign: 'center'}}>{value}</td>
                {bands === 5 && <td className={isChecked(2)} style={{textAlign: 'center'}}>{value}</td>}
                <td className={isChecked(3)} style={{textAlign: 'center'}}>
                  {multiplier && getMagnitude(multiplier) + 'Ω'}
                </td>
                <td className={isChecked(4)} style={{padding: '0 10px'}}>{tolerance && `± ${tolerance}%`}</td>
              </tr>
            );
          })
          }
        </tbody>
      </table>
    </div>
  );
}
