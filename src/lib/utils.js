export const precision = x => parseFloat(x.toFixed(2));

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

  const {order, symbol} = ordersOfMagnitude.find(x => !x.order || lg >= x.order);

  return String(precision(number / 10**order)) + symbol;
};

export const boundaries = (resistance, tolerance) => {
  const fraction = (resistance * tolerance) / 100.00;
  return [
    precision(resistance - fraction),
    precision(resistance + fraction),
  ];
};
