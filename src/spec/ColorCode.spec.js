import {codeToResistor, resistorToCode, Resistor, validResistance} from "../lib/ColorCode";

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
      resistor: new Resistor(97, 20, 4),
      code: ["White", "Violet", "Black", "Blank"],
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
  ];

  TestCases.forEach(({resistance, bands, want}) => {
    const actual = validResistance(resistance, bands);
    expect(actual).toBe(want);
  });
});

