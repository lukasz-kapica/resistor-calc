import React from 'react';
import _ from 'lodash';
import {render, cleanup, fireEvent} from '@testing-library/react';

import Calculator from '../components/Calculator';

afterEach(cleanup);

let Elements = {};

beforeEach(() => {
  const {container} = render(<Calculator />);

  Elements = _.mapValues({
    resistanceInput: '.Resistance__resistance-input',
    toleranceInput: '.Resistance__tolerance-input',
    bandsInput: '.Resistance__bands-input',
    resistorSVG: '.resistor-svg',
    resistorInfo: '.Calculator__resistor-info',
    bandsDiv: '.Bands',
    eseriesDiv: '.ESeries',
  }, queryString => container.querySelector(queryString));

  Elements.container = container;
});

const helpers = {
  getResistorSVGBands() {
    return Array.from(Elements.resistorSVG.querySelectorAll('[class^="Band--"]'))
      .map(tag => tag.classList.value)
      .map(className => className.replace('Band--', ''))
      .map(className => _.capitalize(className));
  },
  getResistanceInputValues() {
    return [Elements.resistanceInput.value, Elements.toleranceInput.value, Elements.bandsInput.value];
  },
  getSelectionBands() {
    const selects = Elements.bandsDiv.querySelectorAll('.ColorSelect__colors');
    return Array.from(selects).map(select => select.value);
  },
  getESeries() {
    return Elements.eseriesDiv.querySelector('.ESeries__content').innerHTML.split(', ');
  },
  getColorSelects() {
    return Elements.container.querySelectorAll('.ColorSelect__colors');
  }
};

test('everything changes accordingly when the resistance fields are changed', () => {
  const {resistanceInput, toleranceInput, bandsInput, resistorInfo} = Elements;

  fireEvent.change(resistanceInput, { target: { value: '150' } });
  fireEvent.change(toleranceInput, { target: { value: '2' } });
  fireEvent.change(bandsInput, { target: { value: '4' } });

  expect(resistorInfo.innerHTML).toBe("150Ω ± 2%");
  expect(helpers.getResistorSVGBands())
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getResistanceInputValues())
    .toEqual(['150', '2', '4']);
  expect(helpers.getSelectionBands())
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getESeries())
    .toEqual(['E6', 'E12', 'E24', 'E96']);
});

test('everything changes accordingly when color bands are changed', () => {
  const {bandsInput, resistorInfo} = Elements;

  fireEvent.change(bandsInput, { target: { value: '4' } });
  const colorSelects = helpers.getColorSelects();
  fireEvent.change(colorSelects[0], { target: { value: 'Brown' } });
  fireEvent.change(colorSelects[1], { target: { value: 'Green' } });
  fireEvent.change(colorSelects[2], { target: { value: 'Brown' } });
  fireEvent.change(colorSelects[3], { target: { value: 'Red' } });

  expect(resistorInfo.innerHTML).toBe("150Ω ± 2%");
  expect(helpers.getResistorSVGBands())
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getResistanceInputValues())
    .toEqual(['150', '2', '4']);
  expect(helpers.getSelectionBands())
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getESeries())
    .toEqual(['E6', 'E12', 'E24', 'E96']);
});
