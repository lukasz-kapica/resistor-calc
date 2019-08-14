import {resistorToCode, Resistor, validResistance} from "../lib/resistor";
import { resistorsWithCodes as TestCases } from "./fixtures";

describe("resistorToCode", () => {
  TestCases.forEach(({ resistor, code }) => {
    it(`should properly encode ${resistor.resistance} ${
      resistor.tolerance
    }% ${resistor.bands} bands resistor`, () => {
      const actual = resistorToCode({...resistor});
      expect(actual).toEqual(code);
    });
  });

  it('should throw an exception when resistor is not valid', () => {
    expect(() => resistorToCode({resistance: -1, tolerance: 5, bands: 1})).toThrowError(Error);
  });

  it('should trim the resistance if necessary', () => {
    const resistor = new Resistor(135, 5, 4);
    const expected = ["Brown", "Orange", "Brown", "Gold"];
    const actual = resistorToCode(resistor);

    expect(actual).toEqual(expected);
  });

  it('should trim high values when necessary', () => {
    const resistor = new Resistor(135000000000, 5, 4);
    const expected = ["Brown", "Orange", "White", "Gold"];
    const actual = resistorToCode(resistor);

    expect(actual).toEqual(expected);
  });
});


describe("validResistance", () => {
  const TestCases = [
    {
      resistance: "123",
      bands: 5,
      want: true
    },
    {
      resistance: "123000",
      bands: 5,
      want: true
    },
    {
      resistance: "1234",
      bands: 5,
      want: false
    },
    {
      resistance: "123000",
      bands: 4,
      want: false
    },
    {
      resistance: "2.2",
      bands: 4,
      want: true
    },
    {
      resistance: undefined,
      bands: 4,
      want: false
    },
    {
      resistance: -1,
      bands: 4,
      want: false
    },
    {
      resistance: 150,
      bands: 3,
      want: true
    },
  ];

  TestCases.forEach(({resistance, bands, want}) => {
    const actual = validResistance(resistance, bands);
    expect(actual).toBe(want);
  });
});
