import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Chart from '../components/Chart';

beforeEach(cleanup);

test('calls onCodeChange when the code is changed', () => {
  const props = {
    code: ["Brown", "Green", "Black", "Red"],
    onCodeChange: jest.fn(),
  };

  const { getByText } = render(<Chart {...props} />);

  const blueMultiplier = getByText('1MΩ');

  fireEvent.click(blueMultiplier);

  expect(props.onCodeChange)
    .toBeCalledWith(["Brown", "Green", "Blue", "Red"])
});
