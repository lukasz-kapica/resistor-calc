import {Resistor} from "../lib/resistor";

export const resistorsWithCodes = [
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
    resistor: new Resistor(10, 2, 5),
    code: ["Brown", "Black", "Black", "Gold", "Red"],
  },
  {
    resistor: new Resistor(4.3, 5, 4),
    code: ["Yellow", "Orange", "Gold", "Gold"],
  },
  {
    resistor: new Resistor(34.8, 1, 5),
    code: ["Orange", "Yellow", "Grey", "Gold", "Brown"],
  },
  {
    resistor: new Resistor(150, 20, 3),
    code: ["Brown", "Green", "Brown"],
  },
  {
    resistor: new Resistor(0.33, 5, 4),
    code: ["Orange", "Orange", "Silver", "Gold"],
  },
];
