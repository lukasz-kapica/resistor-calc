import {codeToResistor, resistorToCode, Resistor, validResistance, getMagnitude} from "../lib/ColorCode";

describe("ColorCode", () => {
  const TestCases = [
    {
      resistor: new Resistor(560000, 5, 4),
      code: ["Green", "Blue", "Yellow", "Gold"],
    },
    {
      resistor: new Resistor(237, 1, 5),
      code: ["Red", "Orange", "Violet", "Black", "Brown"],
    },
    {
      resistor: new Resistor(47000, 5, 4),
      code: ["Yellow", "Violet", "Orange", "Gold"],
    },
    {
      resistor: new Resistor(3300, 0.1, 5),
      code: ["Orange", "Orange", "Black", "Brown", "Violet"],
    },
    {
      resistor: new Resistor(1.58, 2, 5),
      code: ["Brown", "Green", "Grey", "Silver", "Red"],
    },
    {
      resistor: new Resistor(6.15, 0.25, 5),
      code: ["Blue", "Brown", "Green", "Silver", "Blue"],
    },
    {
      resistor: new Resistor(10, 5, 5),
      code: ["Brown", "Black", "Black", "Gold", "Gold"],
    },
    {
      resistor: new Resistor(4.3, 5, 4),
      code: ["Yellow", "Orange", "Gold", "Gold"],
    },
    {
      resistor: new Resistor(34.8, 5, 5),
      code: ["Orange", "Yellow", "Grey", "Gold", "Gold"],
    }
  ];

  describe("codeToResistor", () => {
    TestCases.forEach(({ resistor, code }) => {
      it(`should properly decode ${resistor.resistance} ${
        resistor.tolerance
      }% resistor`, () => {
        const actual = codeToResistor(code);
        expect(actual).toEqual(resistor);
      });
    });

    it('should throw an exception when code is not valid', () => {
      expect(() => codeToResistor()).toThrowError(Error);
    });
  });

  describe("resistorToCode", () => {
    TestCases.forEach(({ resistor, code }) => {
      it(`should properly encode ${resistor.resistance} ${
        resistor.tolerance
      }% ${resistor.bands} bands resistor`, () => {
        const actual = resistorToCode(resistor);
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
  ];

  TestCases.forEach(({resistance, bands, want}) => {
    const actual = validResistance(resistance, bands);
    expect(actual).toBe(want);
  });
});

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
