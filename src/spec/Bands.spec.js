import React from 'react';
import Bands from '../components/Bands';

import {render, cleanup, fireEvent} from "@testing-library/react";

afterEach(cleanup);

let rootContainer, props;

beforeEach(() => {
  props = {
    onCodeChange: jest.fn(),
    code: ["Brown", "Orange", "Black", "Black", "Gold"],
  };
  const {container} = render(<Bands {...props} />);
  rootContainer = container;
});

test('renders ColorSelect for every color in the code array', () => {
  const renderedCode = Array.from(rootContainer.querySelectorAll('.ColorSelect__colors'))
    .map(tag => tag.value);
  expect(renderedCode).toEqual(props.code);
});

test('calls onCodeChange when the code is changed', () => {
  const bands = rootContainer.querySelectorAll('.ColorSelect__colors');
  fireEvent.change(bands[0], { target: { value: "Brown" } });
  expect(props.onCodeChange).toHaveBeenCalledTimes(0);
  fireEvent.change(bands[0], { target: { value: "Red" } });
  expect(props.onCodeChange).toBeCalledWith(["Red", "Orange", "Black", "Black", "Gold"]);
  fireEvent.change(bands[3], { target: { value: "Brown" } });
  expect(props.onCodeChange).toBeCalledWith(["Brown", "Orange", "Black", "Brown", "Gold"]);
});
