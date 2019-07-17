import {getMagnitude} from '../lib/util';

describe("getMagnitude", () => {
  const TestCases = [
    {
      number: 100,
      want: '100'
    },
    {
      number: 1000,
      want: '1K'
    },
    {
      number: 1500,
      want: '1500'
    },
    {
      number: 15000,
      want: '15K'
    },
    {
      number: 15000000,
      want: '15M'
    },
    {
      number: 11000000000,
      want: '11G'
    },
    {
      number: 0,
      want: '0'
    },
  ];

  TestCases.forEach(({number, want}) => {
    it(`should return ${want} for: {number}`, () => {
      const actual = getMagnitude(number);
      expect(actual).toBe(want);
    });
  })
});
