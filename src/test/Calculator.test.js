import React from 'react';
import _ from 'lodash';
import {render, cleanup, fireEvent} from '@testing-library/react';

import Calculator from '../components/Calculator';

afterEach(cleanup);

test('renders proper resistor', () => {
  const { getByText, getByLabelText } = render(<Calculator code={["Orange", "Orange", "Brown", "Gold"]} />);

  expect(getByText("330Ω ± 5%")).toBeTruthy();

  const resistanceInput = getByLabelText('Resistance');
  expect(resistanceInput.value).toBe('330');

  const toleranceInput = getByLabelText('Tolerance');
  expect(toleranceInput.value).toBe('5');
});
