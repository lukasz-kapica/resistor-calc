import React from 'react';

import {render, cleanup} from '@testing-library/react';
import ResistorSVG from '../components/ResistorSVG';

beforeEach(cleanup);

const TestCodes = [
  {
    code: ["Green", "Blue", "Yellow", "Gold"],
  },
  {
    code: ["Red", "Orange", "Violet", "Black", "Brown"],
  }
];

TestCodes.forEach(({code}) => {
  test(`matches snapshot for ${code}`, () => {
    const { container } = render(<ResistorSVG code={code} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
