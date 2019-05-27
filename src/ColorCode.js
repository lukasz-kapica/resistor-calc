/** 
 * Resistor Color Code Calculator
 */

import _ from 'lodash';

/**
 * Resistor is represended by two values
 * @param {Number} resistance - resistance in Ohms
 * @param {Number} tolerance - tolerance in percentage 
 */
export function Resistor(resistance, tolerance) {
  this.resistance = resistance;
  this.tolerance = tolerance;
}

// Create Chart
// http://www.digikey.com/-/media/Images/Marketing/Resources/Calculators/resistor-color-chart.jpg

const colorNames = [
  "Black", "Brown", "Red", "Orange", "Yellow", "Green",
  "Blue", "Violet", "Grey", "White", "Gold", "Silver", "Blank"
];

// Every color from 0 to 9 in colorNames has value equal to its position
const getValue = (index) => _.inRange(index, 10) ? index : undefined;

const getMultiplier = (index) => {
  if (_.inRange(index, 8)) {
    return Math.pow(10, index);
  } else if (index === 10) { // Gold
    return 0.1;
  } else if (index === 11) { // Silver
    return 0.01;
  }
};

// More tricky
const getTolerance = (index) => {
  const indices = [1, 2, 5, 6, 7, 8, 10, 11, 12];
  const tolerances = [1, 2, 0.5, 0.25, 0.10, 0.05, 5, 10, 20];
  const indexOf = indices.indexOf(index);
  return (indexOf !== -1) ? tolerances[indexOf] : undefined;
};

const Chart = {};

_.each(colorNames, (color, index) => {
  Chart[color] = {
    value:      getValue(index),
    multiplier: getMultiplier(index),
    tolerance:  getTolerance(index)
  };
});

// codeToResitor takes 4 or 5 arguments each of which is color
// from colorNames and returns decoded instance of Resitor
export const codeToResitor = (...code) => {
  let len = code.length;

  // We can properly decode only 4 and 5 band resistors
  if (len < 3 || len > 5) {
    return new Resistor(-1, -1);
    // Since I like to avoid using constructs such as try-catch blocks
    // I will use special fictional Resistor(-1, -1) as an error code
  }

  // Blank band stands for tolerance of 20%
  if (len == 3) {
    code.push("Blank");
    len += 1;
  }

  // Fetch first 2 or 3 digits depending on length, and turn it into whole number
  let resistance = 0;
  for (let i = 0; i < len-2; ++i) {
    // So if we have digits a, b, c - the whole number is 100*a + 10*b + c
    resistance = (resistance*10) + Chart[code[i]].value;
  }
  // I know I could use _.reduce for this one so it would be more "functional"
  // but I think for this case it would be overkill as well

  // Fetch multiplier and tolerance
  const multiplier = Chart[code[len-2]].multiplier;
  const tolerance  = Chart[code[len-1]].tolerance;

  // Now we know everything we need about this resistor
  return new Resistor(resistance * multiplier, tolerance);
};

// We nedd fast conversions from values to colors
const valueToColor = (value) => _.inRange(value, 10) ? colorNames[value] : undefined;

const makeMapFromProperty = (property) => (
  _.chain(colorNames)
    .groupBy((color) => Chart[color][property])
    .omit([undefined])
    .mapValues(col => col[0])
    .value()
);

const multiplierArray = makeMapFromProperty("multiplier");
const toleranceArray = makeMapFromProperty("tolerance");

export const resistorToCode = (bands, {resistance, tolerance}) => {
  if (bands < 4 || bands > 5) {
    return [];
  }

  const numberOfdigits = bands - 2;
  const highest10Power = Math.pow(10, numberOfdigits);

  let multiplier = 0.01;
  while (multiplier*highest10Power < resistance) {
    multiplier *= 10;
  }

  const resistanceNumber = resistance / multiplier;

  const digits =
    _.chain(String(resistanceNumber))
      .split('')
      .map(i => parseInt(i))
      .map(i => valueToColor(i))
      .value();

  return [
    ...digits,
    multiplierArray[multiplier],
    toleranceArray[tolerance]
  ];

};

export const valueAndColor =
  _.chain(0)
    .range(10)
    .map(i => [i, colorNames[i]])
    .value();

export const multiplierAndColor =
  Object.keys(multiplierArray)
    .map(key => [key, multiplierArray[key]]);

export const toleranceAndColor =
  Object.keys(toleranceArray)
    .map(key => [key, toleranceArray[key]]);

const ColorCode = {
  codeToResitor,
  resistorToCode,
  Resistor,
  valueAndColor,
  multiplierAndColor,
  toleranceAndColor
};

export default ColorCode;
