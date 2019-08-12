import React from 'react';
import ESeries, { getTriple, baseResistance } from '../components/ESeries';
import { render, cleanup, fireEvent } from '@testing-library/react';
import _ from 'lodash';
import {Resistor} from "../lib/ColorCode";

beforeEach(cleanup);

test('calls onBaseChange when a new base is clicked', () => {
  const props = {
    resistor: new Resistor(150, 5, 4),
    onBaseChange: jest.fn(),
    onToleranceChange: jest.fn(),
  };
  const { getByText } = render(<ESeries {...props} />);
  const base13 = getByText('1.3');
  fireEvent.click(base13);
  expect(props.onBaseChange)
    .toHaveBeenCalledWith(1.3);
});

[{
  resistor: new Resistor(931, 2, 5),
}, {
  resistor: new Resistor(100, 5, 4),
},
].forEach((props) => {
  test(`matches snapshot for resistance: ${props.resistance}`, () => {
    const { container } = render(
      <ESeries {...props}
               onBaseChange={_.noop}
               onToleranceChange={_.noop}
      />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

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

[{
  resistance: 100,
  want: 1,
}, {
  resistance: 348,
  want: 3.48,
},
].forEach(({resistance, want}) => {
  test(`baseResistance(${resistance}) should return ${want}`, () => {
    const got = baseResistance(resistance);
    expect(got).toBe(want);
  });
});
