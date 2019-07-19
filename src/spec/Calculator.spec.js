import React from 'react';
import _ from 'lodash';
import {render, cleanup, fireEvent} from '@testing-library/react';

import Calculator from '../components/Calculator';

afterEach(cleanup);

let resistanceInput, toleranceInput, bandsInput, resistorSVG, resistorInfo, resistanceDiv, bandsDiv, eseriesDiv, rootContainer;

beforeEach(() => {
  const {container} = render(<Calculator />);
  rootContainer = container;

  resistanceInput = container.querySelector('.Resistance__resistance-input');
  toleranceInput = container.querySelector('.Resistance__tolerance-input');
  bandsInput = container.querySelector('.Resistance__bands-input');
  resistorSVG = container.querySelector('.resistor-svg');
  resistorInfo = container.querySelector('.Calculator__resistor-info');
  resistanceDiv = container.querySelector('.Resistance');
  bandsDiv = container.querySelector('.Bands');
  eseriesDiv = container.querySelector('.ESeries');
});

const helpers = {
  getResistorSVGBands(resistorSVG) {
    return Array.from(resistorSVG.querySelectorAll('[class^="Band--"]'))
      .map(tag => tag.classList.value)
      .map(className => className.replace('Band--', ''))
      .map(className => _.capitalize(className));
  },
  getResistanceInputValues(resistanceDiv) {
    const resistanceInput = resistanceDiv.querySelector('.Resistance__resistance-input');
    const toleranceInput = resistanceDiv.querySelector('.Resistance__tolerance-input');
    const bandsInput = resistanceDiv.querySelector('.Resistance__bands-input');

    return [resistanceInput.value, toleranceInput.value, bandsInput.value];
  },
  getSelectionBands(bandsDiv) {
    const selects = bandsDiv.querySelectorAll('.ColorSelect__colors');
    return Array.from(selects)
      .map(select => select.value);
  },
  getESeries(eseriesDiv) {
    return eseriesDiv.querySelector('.ESeries__content').innerHTML.split(', ');
  },
  getColorSelects(container) {
    return container.querySelectorAll('.ColorSelect__colors');
  }
};

test('everything changes accordingly when the resistance fields are changed', () => {
  fireEvent.change(resistanceInput, { target: { value: '150' } });
  fireEvent.change(toleranceInput, { target: { value: '2' } });
  fireEvent.change(bandsInput, { target: { value: '4' } });

  expect(resistorInfo.innerHTML).toBe("150Ω ± 2%");
  expect(helpers.getResistorSVGBands(resistorSVG))
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getResistanceInputValues(resistanceDiv))
    .toEqual(['150', '2', '4']);
  expect(helpers.getSelectionBands(bandsDiv))
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getESeries(eseriesDiv))
    .toEqual(['E6', 'E12', 'E24', 'E96']);
});

test('everything changes accordingly when color bands are changed', () => {
  fireEvent.change(bandsInput, { target: { value: '4' } });
  const colorSelects = helpers.getColorSelects(rootContainer);
  fireEvent.change(colorSelects[0], { target: { value: 'Brown' } });
  fireEvent.change(colorSelects[1], { target: { value: 'Green' } });
  fireEvent.change(colorSelects[2], { target: { value: 'Brown' } });
  fireEvent.change(colorSelects[3], { target: { value: 'Red' } });

  expect(resistorInfo.innerHTML).toBe("150Ω ± 2%");
  expect(helpers.getResistorSVGBands(resistorSVG))
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getResistanceInputValues(resistanceDiv))
    .toEqual(['150', '2', '4']);
  expect(helpers.getSelectionBands(bandsDiv))
    .toEqual(['Brown', 'Green', 'Brown', 'Red']);
  expect(helpers.getESeries(eseriesDiv))
    .toEqual(['E6', 'E12', 'E24', 'E96']);
});
