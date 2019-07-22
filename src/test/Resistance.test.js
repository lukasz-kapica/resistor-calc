import React from 'react';

import Resistance from '../components/Resistance';
import { Resistor } from '../lib/ColorCode';

import {render, cleanup, fireEvent} from "@testing-library/react";

afterEach(cleanup);

let rootContainer, props;

const sampleProps = () => ({
  onBandsChange: jest.fn(),
  onResistanceChange: jest.fn(),
  onToleranceChange: jest.fn(),
  resistor: new Resistor(130, 5, 5),
});

beforeEach(() => {
  props = sampleProps();
  const {container} = render(<Resistance {...props} />);
  rootContainer = container;
});

test('calls onResistanceChange when the resistance is changed', () => {
  const resistanceInput = rootContainer.querySelector('.Resistance__resistance-input');
  fireEvent.change(resistanceInput, { target: { value: props.resistor.resistance }}); // nothing changes
  expect(props.onResistanceChange).toHaveBeenCalledTimes(0);
  fireEvent.change(resistanceInput, { target: { value: 100 }}); // now we have a change
  expect(props.onResistanceChange).toHaveBeenCalledWith(100);
});

test('calls onToleranceChange when the tolerance is changed', () => {
  const toleranceInput = rootContainer.querySelector('.Resistance__tolerance-input');
  fireEvent.change(toleranceInput, { target: { value: props.resistor.tolerance }}); // nothing changes
  expect(props.onToleranceChange).toHaveBeenCalledTimes(0);
  fireEvent.change(toleranceInput, { target: { value: 10 }});
  expect(props.onToleranceChange).toHaveBeenCalledWith(10);
});

test('calls onBandsChange when the number of bands is changed', () => {
  const bandsInput = rootContainer.querySelector('.Resistance__bands-input');
  fireEvent.change(bandsInput, { target: { value: props.resistor.bands }}); // nothing changes
  expect(props.onBandsChange).toHaveBeenCalledTimes(0);
  fireEvent.change(bandsInput, { target: { value: 4 }});
  expect(props.onBandsChange).toHaveBeenCalledWith(4);
});
