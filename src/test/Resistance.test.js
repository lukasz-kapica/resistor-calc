import React from 'react';

import Resistance from '../components/Resistance';
import { Resistor, bandsToTolerances } from '../lib/resistor';

import {render, cleanup, fireEvent} from "@testing-library/react";

afterEach(cleanup);

let resistanceInput, toleranceInput, props, root;

const sampleProps = () => ({
  onResistanceChange: jest.fn(),
  onToleranceChange: jest.fn(),
  tolerances: bandsToTolerances[5],
  resistor: new Resistor(130, 2, 5),
});

beforeEach(() => {
  props = sampleProps();
  const { getByLabelText, container } = render(<Resistance {...props} />);
  root = container;
  resistanceInput = getByLabelText('Resistance');
  toleranceInput = getByLabelText('Tolerance');
});

test('renders proper resistance and tolerance values', () => {
  expect(resistanceInput.value).toBe(String(props.resistor.resistance));
  expect(toleranceInput.value).toBe(String(props.resistor.tolerance));
});

test('calls onResistanceChange when the resistance is changed', () => {
  fireEvent.change(resistanceInput, { target: { value: 100 }});
  expect(props.onResistanceChange).toHaveBeenCalledWith(100);
});

test('calls onToleranceChange when the tolerance is changed', () => {
  fireEvent.change(toleranceInput, { target: { value: 0.25 }});
  expect(props.onToleranceChange).toHaveBeenCalledWith(0.25);
});

test('prevents default on submit', () => {
  const event = new Event('submit');
  Object.assign(event, {
    preventDefault: jest.fn()
  });

  const form = root.querySelector('form');

  fireEvent(form, event);

  expect(event.preventDefault).toHaveBeenCalled();
});
