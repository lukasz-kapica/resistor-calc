import React from 'react';
import ESeries, {mapResistanceToSeries, mapSeriesToContent} from '../components/ESeries';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter(),
});

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
  it('renders series for given resistance', () => {
    TestCases.forEach(test => {
      const wrapper = shallow(<ESeries resistance={test.resistance} />);
      const actual = wrapper.find('.ESeries__content').text();
      const expected = mapSeriesToContent(test.want);
      expect(actual).toBe(expected);
    });
  });
});

describe("mapResistanceToSeries", () => {
  it('returns all possible ESeries in ascending order for given resistance', () => {
    TestCases.forEach(test => {
      const actual = mapResistanceToSeries(test.resistance);
      expect(actual).toEqual(test.want);
    });
  });
});

