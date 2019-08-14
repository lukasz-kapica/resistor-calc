import _ from 'lodash';

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

export const figuresToColors = figures => figures.map(figure => colorNames[figure]);

const makeMapFromProperty = property =>
  _.chain(colorNames)
    .groupBy(color => Chart[color][property])
    .omit([undefined])
    .mapValues(_.first)
    .value();

export const multiplierToColor = makeMapFromProperty("multiplier");
export const toleranceToColor = makeMapFromProperty("tolerance");
