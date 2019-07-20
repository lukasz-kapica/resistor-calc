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
  const firstDigit = rootContainer.querySelector('.ColorSelect__colors');
  fireEvent.change(firstDigit, { target: { value: "Brown" } });
  expect(props.onCodeChange).toHaveBeenCalledTimes(0);
  fireEvent.change(firstDigit, { target: { value: "Red" } });
  expect(props.onCodeChange).toBeCalledWith(["Red", ...props.code.slice(1)]);
});
