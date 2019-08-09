export function getMagnitude(number) {
  if (number === 0) return '0';

  if (!number) return undefined;

  const decimals = number.toString().split('');

  if (decimals.includes('.')) {
    return number.toString();
  }

  const len = decimals.length;

  const ordersOfMagnitude = [
    {zeros: 12, symbol: "T"},
    {zeros:  9, symbol: "G"},
    {zeros:  6, symbol: "M"},
    {zeros:  3, symbol: "K"},
  ];

  for (let i = 0; i < ordersOfMagnitude.length; i++) {
    const {zeros, symbol} = ordersOfMagnitude[i];
    if (len > zeros) {
      return String(parseFloat((number / Math.pow(10, zeros)).toFixed(2))) + symbol;
    }
  }

  return number.toString();
}

export function getBounds(resistance, tolerance) {
  const d = (resistance * tolerance) / 100.00;
  const lowerBound = Math.floor(resistance - d);
  const upperBound = Math.ceil(resistance + d);
  return [lowerBound, upperBound];
}
