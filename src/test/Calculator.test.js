import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';

import Calculator from '../components/Calculator';

afterEach(cleanup);

test('renders proper resistor', () => {
  const { getByText, getByDisplayValue } = render(<Calculator code={["Orange", "Orange", "Brown", "Gold"]} />); // 330 Ohms

  expect(getByText("330Ω ± 5%")).toBeTruthy();
  expect(getByDisplayValue('330')).toBeTruthy();
  expect(getByDisplayValue('5%')).toBeTruthy();
});

test('changes bands', () => {
  const { getByText } = render(<Calculator code={["Orange", "Orange", "Brown", "Gold"]} />); // 330 Ohms
  const bands5 = getByText('5 bands');
  fireEvent.click(bands5);
  expect(getByText('2%')).toBeTruthy();
  expect(getByText('E192')).toBeTruthy();
});

test('changes significand', () => {
  const { getByText, getByDisplayValue } = render(<Calculator code={["Orange", "Orange", "Brown", "Gold"]} />); // 330 Ohms
  fireEvent.click(getByText('3.6'));
  expect(getByText("360Ω ± 5%")).toBeTruthy();
  expect(getByDisplayValue('360')).toBeTruthy();
  expect(getByDisplayValue('5%')).toBeTruthy();
});
