import React from 'react';
import ESeries, {mapResistanceToSeries, mapSeriesToContent} from '../components/ESeries';
import { render, cleanup } from '@testing-library/react';

const TestCases = [
  {
    resistance: 130,
    want: ['E24', 'E96']
  },
  {
    resistance: 1,
    want: ['E3', 'E6', 'E12', 'E24', 'E48', 'E96']
  },
  {
    resistance: 205,
    want: ['E48', 'E96']
  },
  {
    resistance: 111,
    want: []
  },
  {
    resistance: 0,
    want: []
  },
  {
    resistance: 0.13,
    want: ['E24', 'E96']
  },
];

describe('<ESeries />', () => {
  beforeEach(cleanup);
  TestCases.forEach(({resistance, want}) => {
    test(`renders ${want} ESeries for ${resistance} resistance`, () => {
      const { container } = render(<ESeries resistance={resistance} />);
      const actual = container.querySelector('.ESeries__content').innerHTML;
      const expected = mapSeriesToContent(want);
      expect(actual).toBe(expected);
    });
  });
});

describe("mapResistanceToSeries", () => {
  TestCases.forEach(({resistance, want}) => {
    it(`returns ${want} for ${resistance}`, () => {
      const actual = mapResistanceToSeries(resistance);
      expect(actual).toEqual(want);
    });
  });
});
