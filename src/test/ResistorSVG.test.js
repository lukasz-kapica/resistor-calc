import React from 'react';

import {render, cleanup} from '@testing-library/react';
import ResistorSVG from '../components/ResistorSVG';
import _ from "lodash";

beforeEach(cleanup);

const TestCodes = [
  {
    code: ["Green", "Blue", "Yellow", "Gold"],
  },
  {
    code: ["Red", "Orange", "Violet", "Black", "Brown"],
  },
  {
    code: ["Yellow", "Violet", "Orange", "Gold"],
  },
  {
    code: ["White", "Violet", "Black", "Blank"],
  },
  {
    code: ["Orange", "Orange", "Black", "Brown", "Violet"],
  },
  {
    code: ["Brown", "Green", "Grey", "Silver", "Red"],
  },
  {
    code: ["Blue", "Brown", "Green", "Silver", "Blue"],
  },
];

TestCodes.forEach(({code}) => {
  test(`renders stripes for ${code}`, () => {
    const {container} = render(<ResistorSVG code={code} />);
    const resistorSVG = container.querySelector('.resistor-svg');
    const bands = getResistorSVGBands(resistorSVG);
    expect(bands).toEqual(code);
  });
});

test('renders nothing if code is not valid', () => {
  const {container} = render(<ResistorSVG code={[]} />);
  const resistorSVG = container.querySelector('.resistor-svg');
  expect(resistorSVG).toBeNull();
});

function getResistorSVGBands(resistorSVG) {
  return Array.from(resistorSVG.querySelectorAll('.Band'))
    .map(tag => tag.classList.value.split(" ")[1])
    .map(className => className.replace('is-', ''))
    .map(className => _.capitalize(className));
}
