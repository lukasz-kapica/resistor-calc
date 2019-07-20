/**
 * Resistor Color Code Calculator
 */

import _ from "lodash";

/**
 * Resistor is represented by two values
 * @param {Number} resistance - resistance in Ohms
 * @param {Number} tolerance - tolerance in percentage
 * @param {Number} bands - number of bands
 */
export function Resistor(resistance, tolerance, bands) {
  this.resistance = resistance;
  this.tolerance = tolerance;
  this.bands = bands;
}

// Create Chart
// http://www.digikey.com/-/media/Images/Marketing/Resources/Calculators/resistor-color-chart.jpg

export const colorNames = [
  "Black",
  "Brown",
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Violet",
  "Grey",
  "White",
  "Gold",
  "Silver",
  "Blank"
];

// Colors with indices from 0 to 9 in colorNames
// have values equal to their positions in the array
function mapIndexToValue(index) {
  return _.inRange(index, 0, 10) ? index : undefined;
}

// Each color in the array has it's corresponding 'multiplier' value
function mapIndexToMultiplier(index) {
  if (_.inRange(index, 0, 10)) {
    return Math.pow(10, index);
  }
  if (index === 10) {
    // Gold
    return 0.1;
  }
  if (index === 11) {
    // Silver
    return 0.01;
  }
  return undefined;
}

// Some colors in the array have tolerance associated with them
function mapIndexToTolerance(index) {
  const indices = [1, 2, 5, 6, 7, 8, 10, 11, 12];
  const tolerances = [1, 2, 0.5, 0.25, 0.1, 0.05, 5, 10, 20];
  const indexOf = indices.indexOf(index);
  return indexOf !== -1 ? tolerances[indexOf] : undefined;
}

export const Chart = colorNames.reduce(
  (acc, color, index) => ({
    ...acc,
    [color]: {
      value: mapIndexToValue(index),
      multiplier: mapIndexToMultiplier(index),
      tolerance: mapIndexToTolerance(index)
    }
  }),
  {}
);

// ------ End of creating a chart ------

/**
 * Create a resistor instance from the color code
 * @param  {...any} code - 3, 4 or 5 arguments each of which is a color from the colorNames array
 * @returns {Resistor} resistor - decoded instance of the Resitor
 */
export function codeToResistor(code) {
  // We can properly decode only 3, 4 and 5 band resistors
  if (!code || !code.length || code.length < 3 || code.length > 5) {
    throw new Error(
      `codeToResistor function takes only 3, 4 or 5 arguments`
    );
  }

  let len = code.length;

  // So that if we have digits a, b, c - the whole number is 100*a + 10*b + c
  // if a, b the whole number is 10*a + b
  const resistance = code
    .slice(0, len - 2)
    .reduce((acc, color) => acc * 10 + Chart[color].value, 0);

  const multiplier = Chart[code[len - 2]].multiplier;
  const tolerance = Chart[code[len - 1]].tolerance;

  return new Resistor(resistance * multiplier, tolerance, len);
}

// We need a fast conversions from values to colors
function mapValueToColor(value) {
  return _.inRange(value, 10) ? colorNames[value] : undefined;
}

const makeMapFromProperty = property =>
  _.chain(colorNames)
    .groupBy(color => Chart[color][property])
    .omit([undefined])
    .mapValues(col => col[0])
    .value();

const multiplierArray = makeMapFromProperty("multiplier");
const toleranceArray = makeMapFromProperty("tolerance");

export function resistorToCode({ resistance, tolerance, bands }) {
  if (bands < 4 || bands > 5 || resistance <= 0) {
    throw new Error(`resistorToCode: incorrect input data`);
  }

  const bounds = {
    4: 99  * 1000000000,
    5: 999 * 1000000000,
  };

  if (resistance > bounds[bands]) {
    resistance /= 10;
  }

  const numberOfDigits = bands - 2;
  const highest10Power = Math.pow(10, numberOfDigits);

  let multiplier = 0.01;
  while (multiplier * highest10Power <= resistance) {
    multiplier *= 10;
  }

  const resistanceNumber = Math.floor((resistance / multiplier).toFixed(2));

  const digits = _.chain(String(resistanceNumber).padStart(numberOfDigits, '0'))
    .split("")
    .map(i => parseInt(i))
    .map(i => mapValueToColor(i))
    .value();

  return [...digits, multiplierArray[multiplier], toleranceArray[tolerance]];
}

export const valueAndColor = _.chain(0)
  .range(10)
  .map(i => [i, colorNames[i]])
  .value();

export const multiplierAndColor = Object.keys(multiplierArray).map(key => [
  key,
  multiplierArray[key]
]);

export const toleranceAndColor = Object.keys(toleranceArray).map(key => [
  key,
  toleranceArray[key]
]);

export function validResistance(resistance, bands) {
  resistance = +resistance;
  let resistanceStr = String(resistance);

  if (typeof resistance !== 'number' || Number.isNaN(resistance)) {
    return false;
  }

  const bounds = {
    4: 99  * 1000000000,
    5: 999 * 1000000000,
  };

  if (resistance < 1 || resistance > bounds[bands]) {
    return false;
  }

  resistanceStr = resistanceStr.replace('.', '');

  return Array.from(resistanceStr.slice(bands-2)).every(char => char === '0');
}

export function getMagnitude(number) {
  if (number === 0) return '0';

  if (!number) return undefined;

  const decimals = number.toString().split('');

  if (decimals.includes('.')) {
    return number.toString();
  }

  let leadingZeros = 0;
  for (let i = decimals.length-1; i > 0 && decimals[i] === '0'; i--) {
    leadingZeros++;
  }

  const ordersOfMagnitude = [
    {zeros: 9, symbol: "G"},
    {zeros: 6, symbol: "M"},
    {zeros: 3, symbol: "K"},
  ];

  for (let i = 0; i < ordersOfMagnitude.length; i++) {
    const {zeros, symbol} = ordersOfMagnitude[i];
    if (leadingZeros >= zeros) {
      return decimals.slice(0, decimals.length-zeros).join("") + symbol;
    }
  }

  return number.toString();
}
