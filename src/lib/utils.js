import _ from 'lodash';

export const precision = x => _.round(x, 2);

export const lg10 = x => Math.floor(Math.log10(x));

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

export const boundaries = (resistance, tolerance) => {
  const fraction = (resistance * tolerance) / 100.00;
  return [
    precision(resistance - fraction),
    precision(resistance + fraction),
  ];
};

export const base = n => (n === 0) ? n : precision(n / 10**lg10(n));

export const stripZero = value =>
  String(value).substr(value < 1 ? 1 : 0);

