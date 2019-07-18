import React from 'react';

import {Chart as ch, colorNames, getMagnitude} from '../lib/ColorCode';

export default function Chart() {
  return (
    <div className="Chart">
      <h3>Resistor Color Chart</h3>
      <table>
        <thead>
          <tr>
            <th>Color</th>
            <th>Band #1</th>
            <th>Band #2</th>
            <th>Band #3</th>
            <th>Multiplier</th>
            <th>Tolerance</th>
          </tr>
        </thead>
        <tbody>
          {colorNames.map((color) => {
            const {value, multiplier, tolerance} = ch[color];
            const className = `is-${color.toLocaleLowerCase()}`;
            return (
              <tr key={color} className={className}>
                <td style={{padding: '0 10px'}}>{color}</td>
                <td style={{textAlign: 'center'}}>{value}</td>
                <td style={{textAlign: 'center'}}>{value}</td>
                <td style={{textAlign: 'center'}}>{value}</td>
                <td style={{textAlign: 'center'}}>
                  {multiplier && getMagnitude(multiplier) + 'Ω'}
                </td>
                <td style={{padding: '0 10px'}}>{tolerance && `± ${tolerance}%`}</td>
              </tr>
            );
          })
          }
        </tbody>
      </table>
    </div>
  );
}
