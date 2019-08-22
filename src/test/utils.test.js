import {magnitude, boundaries, precision, significand} from "../lib/utils";

describe("magnitude", () => {
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
      want: '1.5K'
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
      number: 1110000000000,
      want: '1.11T'
    },
    {
      number: 0,
      want: '0'
    },
  ];

  TestCases.forEach(({number, want}) => {
    it(`returns ${want} for ${number}`, () => {
      const actual = magnitude(number);
      expect(actual).toBe(want);
    });
  })
});

describe('boundaries', () => {
  const TestCases = [
    {
      resistance: 1,
      tolerance: 20,
      want: [0.8, 1.2],
    },
    {
      resistance: 10,
      tolerance: 20,
      want: [8, 12],
    },
  ];

  TestCases.forEach(({resistance, tolerance, want}) => {
    it(`returns [${want}] for ${resistance} ± ${tolerance}%`, () => {
      const got = boundaries(resistance, tolerance);
      expect(got).toEqual(want);
    });
  });
});

describe('precision', () => {
  const TestCases = [
    {
      x: 3.141592,
      want: 3.14,
    },
    {
      x: 1.011592,
      want: 1.01,
    },
    {
      x: 1.001592,
      want: 1,
    },
  ];

  TestCases.forEach(({x, want}) => {
    it(`returns ${want} for ${x}`, () => {
      const got = precision(x);
      expect(got).toEqual(want);
    });
  });
});


[{
  resistance: 100,
  want: 1,
}, {
  resistance: 348,
  want: 3.48,
},
].forEach(({resistance, want}) => {
  test(`base(${resistance}) should return ${want}`, () => {
    const got = significand(resistance);
    expect(got).toBe(want);
  });
});
