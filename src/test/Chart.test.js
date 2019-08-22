import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Chart from '../components/Chart';

beforeEach(cleanup);

test('calls onCodeChange when the code is changed', () => {
  const props = {
    code: ["Orange", "Orange", "Brown", "Gold"],
    onCodeChange: jest.fn(),
  };

  const { getByText, getAllByText } = render(<Chart {...props} />);

  const greenFigure = getAllByText('5')[0];
  fireEvent.click(greenFigure);

  expect(props.onCodeChange)
    .toHaveBeenCalledWith(["Green", "Orange", "Brown", "Gold"]);

  const blueMultiplier = getByText('1MΩ');
  fireEvent.click(blueMultiplier);

  expect(props.onCodeChange)
    .toHaveBeenCalledWith(["Orange", "Orange", "Blue", "Gold"]);

  const silverTolerance = getByText('± 10%');
  fireEvent.click(silverTolerance);

  expect(props.onCodeChange)
    .toHaveBeenCalledWith(["Orange", "Orange", "Brown", "Silver"])
});
