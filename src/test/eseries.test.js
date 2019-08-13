import {getTriple} from "../lib/eseries";

[{
  base: 9.53,
  series: 'E96',
  want: [9.31, 9.53, 9.76],
}, {
  base: 1,
  series: 'E6',
  want: [null, 1, 1.5],
}, {
  base: 3.48,
  series: 'E192',
  want: [3.44, 3.48, 3.52],
},
].forEach(({base, series, want}) => {
  test(`getTriple(${base}, ${series}) should return: ${want}`, () => {
    const got = getTriple(base, series);
    expect(got).toEqual(want);
  });
});
