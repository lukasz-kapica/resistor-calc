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
      return String(parseFloat((number / 10**order).toFixed(2))) + symbol;
    }
  }

  return number.toString();
}

export function getBounds(resistance, tolerance) {
  const d = (resistance * tolerance) / 100.00;
  const lowerBound = parseFloat((resistance - d).toFixed(2));
  const upperBound = parseFloat((resistance + d).toFixed(2));
  return [lowerBound, upperBound];
}
