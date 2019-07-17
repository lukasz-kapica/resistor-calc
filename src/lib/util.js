export function getMagnitude(number) {
  if (number === 0) return '0';

  if (!number) return undefined;

  const decimals = number.toString().split('');

  if (decimals.includes('.')) {
    return number.toString();
  }

  let leadingZeros = 0;
  for (let i = decimals.length-1; i > 0 && decimals[i] === '0'; i--) {
    leadingZeros++;
  }

  const ordersOfMagnitude = [
    {zeros: 9, symbol: "G"},
    {zeros: 6, symbol: "M"},
    {zeros: 3, symbol: "K"},
  ]

  for (let i = 0; i < ordersOfMagnitude.length; i++) {
    const {zeros, symbol} = ordersOfMagnitude[i];
    if (leadingZeros >= zeros) {
      return decimals.slice(0, decimals.length-zeros).join("") + symbol;
    }
  }

  return number.toString();
}

export const pluckSecond = (xs) => xs.map(([_, x]) => x);
