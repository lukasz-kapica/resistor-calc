import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';

import Calculator from '../components/Calculator';

afterEach(cleanup);

test('renders proper resistor', () => {
  const { getByText, getByDisplayValue } = render(<Calculator code={["Orange", "Orange", "Brown", "Gold"]} />); // 330 Ohms

  expect(getByText("330Ω ± 5%")).toBeTruthy();
  expect(getByDisplayValue('330')).toBeTruthy();
  expect(getByDisplayValue('5%')).toBeTruthy();
});
