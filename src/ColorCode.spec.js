import _ from 'lodash';

import {
 codeToResitor,
 resistorToCode,
 Resistor
} from './ColorCode';

describe("ColorCode", () => {

  const TestCases = [{
    resistor: new Resistor(560000, 5),
    code: ["Green", "Blue", "Yellow", "Gold"],
    bands: 4
  }, {
    resistor: new Resistor(237, 1),
    code: ["Red", "Orange", "Violet", "Black", "Brown"],
    bands: 5
  }, {
    resistor: new Resistor(47000, 5),
    code: ["Yellow", "Violet", "Orange", "Gold"],
    bands: 4
  }, {
    resistor: new Resistor(97, 20),
    code: ["White", "Violet", "Black", "Blank"],
    bands: 4
  }, {
    resistor: new Resistor(3300, 0.1),
    code: ["Orange", "Orange", "Black", "Brown", "Violet"],
    bands: 5
  }, {
    resistor: new Resistor(1.58, 2),
    code: ["Brown", "Green", "Grey", "Silver", "Red"],
    bands: 5
  }, {
    resistor: new Resistor(6.15, 0.25),
    code: ["Blue", "Brown", "Green", "Silver", "Blue"],
    bands: 5
  }];

  describe("#codeToResitor", () => {

    _.each(TestCases, ({resistor, code}) => {
      it(`should properly decode ${resistor.resistance} ${resistor.tolerance}% resistor`, () => {
        const actual = codeToResitor(...code);
        expect(actual).toEqual(resistor);
      });
    });

  });

  describe("#resistorToCode", () => {

    _.each(TestCases, ({resistor, code, bands}) => {
      it(`should properly encode ${resistor.resistance} ${resistor.tolerance}% resistor`, () => {
        const actual = resistorToCode(bands, resistor);
        expect(actual).toEqual(code);
      });
    });

  });

});
