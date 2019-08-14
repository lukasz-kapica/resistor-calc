import {precision} from "./utils";
import {multiplierToColor, toleranceToColor, figuresToColors} from './chart';

/**
 * Resistor is represented by two values
 * @param {Number} resistance - resistance in Ohms
 * @param {Number} tolerance - tolerance in percentage
 * @param {Number} bands - number of bands
 */
export function Resistor(resistance, tolerance, bands) {
  this.resistance = +resistance;
  this.tolerance = +tolerance;
  this.bands = +bands;
}

const bandsToBounds = {
  3: 99  * 1000000000,
  4: 99  * 1000000000,
  5: 999 * 1000000000,
};

export const bandsToDigits = bands => (bands === 5) ? 3 : 2;

export const bandsToTolerances = {
  3: [20],
  4: [5, 10],
  5: [2, 1, 0.5, 0.25, 0.1, 0.05],
};

export function resistorToCode({ resistance, tolerance, bands }) {
  if (!bandsToTolerances[bands].includes(tolerance)) {
    tolerance = bandsToTolerances[bands][0];
  }

  if (resistance > bandsToBounds[bands]) {
    resistance /= 10;
  }

  const numberOfDigits = bandsToDigits(bands);
  const highest10Power = 10**numberOfDigits;

  //const multiplier = x => 10**Math.floor(Math.log10(x));

  let multiplier = 0.01;
  while (multiplier * highest10Power <= resistance) {
    multiplier *= 10;
  }

  const resistanceNumber = Math.floor(precision(resistance / multiplier));

  const figures = String(resistanceNumber)
    .padStart(numberOfDigits, '0')
    .split("")
    .map(i => parseInt(i));

  const code = figuresToColors(figures);

  code.push(multiplierToColor[multiplier]);
  bands > 3 && code.push(toleranceToColor[tolerance]);

  return code;
}

export function validResistance(resistance, bands) {
  resistance = +resistance;
  bands = +bands;
  const digits = bandsToDigits(bands);
  let resistanceStr = String(resistance);

  if (typeof resistance !== 'number' || Number.isNaN(resistance)) {
    return false;
  }

  if (resistance < 1 || resistance > bandsToBounds[bands]) {
    return false;
  }

  resistanceStr = resistanceStr.replace('.', '');

  return Array.from(resistanceStr.slice(digits)).every(char => char === '0');
}
