import _ from 'lodash';

/**
 * Rounds number to the second place after a comma
 * @param {number} x
 * @returns {number}
 */
export const precision = x => _.round(x, 2);

/**
 * Computes a floor of a decimal logarithm of x
 * @param {number} x
 * @returns {number}
 */
export const lg10 = x => Math.floor(Math.log10(x));

/**
 * Replaces maximum number of trailing zeros with a corresponding magnitude symbol
 * @param {number} number
 * @returns {string}
 */
export const magnitude = number => {
  if (!number) return '0';

  const ordersOfMagnitude = [
    {order: 12, symbol: "T"},
    {order:  9, symbol: "G"},
    {order:  6, symbol: "M"},
    {order:  3, symbol: "K"},
    {order:  0, symbol:  ""},
  ];

  const {order, symbol} = ordersOfMagnitude.find(
    x => x.order === 0 || lg10(number) >= x.order);

  return `${precision(number / 10**order)}${symbol}`;
};

/**
 * Computes the smallest and largest possible resistances for given resistance and tolerance
 * @param {number} resistance
 * @param {number} tolerance
 * @returns {[number, number]}
 */
export const boundaries = (resistance, tolerance) => {
  const fraction = (resistance * tolerance) / 100.00;
  return [
    precision(resistance - fraction),
    precision(resistance + fraction),
  ];
};

/**
 * Returns the significand s of number n, such that: 0 <= s < 10
 * i.e. 1234 -> 1.23, 1000 -> 1, 3.1415 -> 3.14, 0 -> 0
 * @param {number} n
 * @returns {number}
 */
export const significand = n => (n === 0) ? n : precision(n / 10**lg10(n));

/**
 * Returns the value as a string with leading zero omitted
 * @param {number} value
 * @returns {string}
 */
export const stripZero = value => String(value).substr(value < 1 ? 1 : 0);

