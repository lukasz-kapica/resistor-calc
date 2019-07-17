import React from 'react';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResistorSVG from '../components/ResistorSVG';

configure({adapter: new Adapter()});

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

describe('<ResistorSVG />', () => {
  it('renders stripes', () => {
    TestCodes.forEach(({code}) => {
      const wrapper = shallow(<ResistorSVG code={code} />);
      const selectors = code.map(color => `Band--${color.toLowerCase()}`);
    });
  });
});
