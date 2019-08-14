import {codeToResistor} from "../lib/code";
import { resistorsWithCodes as TestCases } from "./fixtures";

describe("codeToResistor", () => {
  TestCases.forEach(({ resistor, code }) => {
    it(`should properly decode ${resistor.resistance} ${
      resistor.tolerance
    }% resistor`, () => {
      const actual = codeToResistor([...code]);
      expect(actual).toEqual(resistor);
    });
  });

  it('should throw an exception when code is not valid', () => {
    expect(() => codeToResistor()).toThrowError(Error);
  });
});
