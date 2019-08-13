import _ from 'lodash';

export const precision = x => _.round(x, 2);

export const magnitude = number => {
  if (!number || number === 0) {
    return '0';
  }

  const ordersOfMagnitude = [
    {order: 12, symbol: "T"},
    {order:  9, symbol: "G"},
    {order:  6, symbol: "M"},
    {order:  3, symbol: "K"},
    {order:  0, symbol:  ""},
  ];

  const lg = Math.floor(Math.log10(number));

  const {order, symbol} = ordersOfMagnitude.find(x => x.order === 0 || lg >= x.order);

  return `${precision(number / 10**order)}${symbol}`;
};

export const boundaries = (resistance, tolerance) => {
  const fraction = (resistance * tolerance) / 100.00;
  return [
    precision(resistance - fraction),
    precision(resistance + fraction),
  ];
};

export const base = n => {
  if (n <= 0) return 0;

  const lg = Math.floor(Math.log10(n));
  return precision(n / 10**lg);
};

export const stripZero = value => {
  if (-1 < value && value < 1) {
    return String(value).substr(1);
  }
  return String(value);
};
