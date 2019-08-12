export const precision = x => parseFloat(x.toFixed(2));

export function getMagnitude(number) {
  if (!number || number === 0) {
    return '0';
  }

  const ordersOfMagnitude = [
    {order: 12, symbol: "T"},
    {order:  9, symbol: "G"},
    {order:  6, symbol: "M"},
    {order:  3, symbol: "K"},
  ];

  const lg = Math.floor(Math.log10(number));

  for (let i = 0; i < ordersOfMagnitude.length; i++) {
    const {order, symbol} = ordersOfMagnitude[i];
    if (lg >= order) {
      return String(precision(number / 10**order)) + symbol;
    }
  }

  return number.toString();
}

export function getBounds(resistance, tolerance) {
  const fraction = (resistance * tolerance) / 100.00;
  return [
    precision(resistance - fraction),
    precision(resistance + fraction)
  ];
}
