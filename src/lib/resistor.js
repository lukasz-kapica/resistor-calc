import {lg10, precision, significand, stripZero} from "./utils";
import {multiplierToColor, toleranceToColor, figuresToColors} from './chart';

/**
 * Represents a resistor
 * @constructor
 * @param {number} resistance - resistance in Ohms
 * @param {number} tolerance - tolerance in percentage
 * @param {number} bands - number of bands
 */
export function Resistor(resistance, tolerance, bands) {
  this.resistance = +resistance;
  this.tolerance = +tolerance;
  this.bands = +bands;
}

/**
 * The maximal resistance by the number of bands
 * @type {{"3": number, "4": number, "5": number}}
 */
const bandsToBounds = {
  3: 99  * 1000000000,
  4: 99  * 1000000000,
  5: 999 * 1000000000,
};

/**
 * Number of digits by the number of bands
 * @param {number} bands
 * @returns {number} digits
 */
export const bandsToDigits = bands => (bands === 5) ? 3 : 2;

/**
 * Possible tolerances by the number of bands
 * @type {{"3": number[], "4": number[], "5": number[]}}
 */
export const bandsToTolerances = {
  3: [20],
  4: [5, 10],
  5: [2, 1, 0.5, 0.25, 0.1, 0.05],
};

/**
 * Computes the color code
 * @param {Resistor} resistor
 * @returns {string[]} code
 */
export function resistorToCode(resistor) {
  let { resistance, tolerance, bands } = resistor;

  if (!bandsToTolerances[bands].includes(tolerance)) {
    tolerance = bandsToTolerances[bands][0];
  }

  if (resistance > bandsToBounds[bands]) {
    resistance /= 10;
  }

  const numberOfDigits = bandsToDigits(bands);
  const res = Math.floor(significand(resistance) * 10**(numberOfDigits-1));
  const multiplier = 10 ** (lg10(resistance) - numberOfDigits + 1);

  const figures = String(res)
    .padStart(numberOfDigits, '0')
    .split("")
    .map(i => parseInt(i));

  const code = figuresToColors(figures);

  code.push(multiplierToColor[multiplier]);
  bands > 3 && code.push(toleranceToColor[tolerance]);

  return code;
}

/**
 * Tests if the resistance and bands pair is valid
 * @param {number} resistance
 * @param {number} bands
 * @returns {boolean}
 */
export function validResistance(resistance, bands) {
  resistance = +resistance;
  bands = +bands;
  const digits = bandsToDigits(bands);
  let resistanceStr = stripZero(resistance);

  if (typeof resistance !== 'number' || Number.isNaN(resistance)) {
    return false;
  }

  if (resistance < 0 || resistance > bandsToBounds[bands]) {
    return false;
  }

  resistanceStr = resistanceStr.replace('.', '');

  return Array.from(resistanceStr.slice(digits)).every(char => char === '0');
}
