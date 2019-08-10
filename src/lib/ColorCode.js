import _ from "lodash";

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
];

export const bandsToTolerances = {
  3: [20],
  4: [5, 10],
  5: [2, 1, 0.5, 0.25, 0.1, 0.05],
};

const bandsToBounds = {
  3: 99  * 1000000000,
  4: 99  * 1000000000,
  5: 999 * 1000000000,
};

export const bandsToDigits = bands => (bands === 5) ? 3 : 2;

// Colors with indices from 0 to 9 in colorNames
// have values equal to their positions in the array
const mapIndexToValue = x => _.inRange(x, 0, 10) ? x : undefined;

// Each color in the array has it's corresponding 'multiplier' value
const mapIndexToMultiplier = _.cond([
  [x => _.inRange(x, 0, 10), x => 10**x],
  [x => x === 10, _.constant(0.1)], // Gold
  [x => x === 11, _.constant(0.01)], // Silver
  [_.stubTrue, _.noop],
]);

// Some colors in the array have tolerance associated with them
const mapIndexToTolerance = index => {
  const indices =    [1, 2, 5,   6,    7,   8,   10, 11];
  const tolerances = [1, 2, 0.5, 0.25, 0.1, 0.05, 5, 10];
  const indexOf = indices.indexOf(index);
  return indexOf !== -1 ? tolerances[indexOf] : undefined;
};

export const Chart = colorNames.reduce(
  (acc, color, index) => ({
    ...acc,
    [color]: {
      value:      mapIndexToValue(index),
      multiplier: mapIndexToMultiplier(index),
      tolerance:  mapIndexToTolerance(index),
    },
  }),
  {}
);

/**
 * Create a resistor instance from the color code
 * @param  {string[]} code - 3, 4 or 5 arguments each of which is a color from the colorNames array
 * @returns {Resistor} resistor - decoded instance of the Resistor
 */
export function codeToResistor(code) {
  // We can properly decode only 3, 4 and 5 band resistors
  if (!code || !code.length || code.length < 3 || code.length > 5) {
    throw new Error(
      `codeToResistor function takes an array which consists of 3, 4 or 5 colors`
    );
  }

  const len = code.length;
  const digits = bandsToDigits(len);

  // So that if we have digits a, b, c - the whole number is 100*a + 10*b + c
  // if a, b the whole number is 10*a + b
  const resistance = code
    .slice(0, digits)
    .reduce((acc, color) => acc * 10 + Chart[color].value, 0);

  const multiplier = Chart[code[digits]].multiplier;
  const tolerance = len === 3 ? 20 : Chart[code[digits+1]].tolerance;
  const finalResistance = parseFloat((resistance * multiplier).toFixed(2));

  return new Resistor(finalResistance, tolerance, len);
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
  bands = +bands;

  if (bands < 3 || bands > 5 || resistance <= 0) {
    throw new Error(`resistorToCode: incorrect input data`);
  }

  if (!bandsToTolerances[bands].includes(tolerance)) {
    tolerance = bandsToTolerances[bands][0];
  }

  if (resistance > bandsToBounds[bands]) {
    resistance /= 10;
  }

  const numberOfDigits = bandsToDigits(bands);
  const highest10Power = 10**numberOfDigits;

  let multiplier = 0.01;
  while (multiplier * highest10Power <= resistance) {
    multiplier *= 10;
  }

  const intermid = (resistance / multiplier).toFixed(2);
  const resistanceNumber = Math.floor(parseFloat(intermid));

  const code = String(resistanceNumber)
    .padStart(numberOfDigits, '0')
    .split("")
    .map(i => parseInt(i))
    .map(i => colorNames[i]);

  code.push(multiplierArray[multiplier]);
  if (bands > 3) {
    code.push(toleranceArray[tolerance]);
  }

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

