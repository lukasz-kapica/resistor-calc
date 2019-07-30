import React from 'react';
import ESeries from '../components/ESeries';
import { render, cleanup, fireEvent } from '@testing-library/react';

beforeEach(cleanup);

test('calls onBaseChange when a new base is clicked', () => {
  const props = {
    resistance: 150,
    onBaseChange: jest.fn(),
  };
  const { getByText } = render(<ESeries {...props} />);
  const base13 = getByText('1.3');
  fireEvent.click(base13);
  expect(props.onBaseChange)
    .toHaveBeenCalledWith(1.3);
});
