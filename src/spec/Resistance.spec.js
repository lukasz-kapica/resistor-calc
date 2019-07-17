import React from 'react';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Resistance from '../components/Resistance';
import { Resistor } from '../lib/ColorCode';

configure({adapter: new Adapter()});

describe('<Resistance />', () => {

  let wrapper, props;

  const sampleProps = () => ({
    onBandsChange: jest.fn(),
    onResistanceChange: jest.fn(),
    onToleranceChange: jest.fn(),
    resistor: new Resistor(130, 5, 5),
  });

  beforeEach(() => {
    props = sampleProps();
    wrapper = shallow(<Resistance {...props} />);
  });

  it('renders an input for resistance, tolerance and number of bands', () => {
    const selectors = [
      '.Resistance__resistance-input',
      '.Resistance__tolerance-input',
      '.Resistance__bands-input',
    ];

    selectors.forEach(selector =>
      expect(wrapper.find(selector).exists()).toBe(true)
    );
  });

  it('calls onResistanceChange when the resistance is changed', () => {
    const resistanceInput = wrapper.find('.Resistance__resistance-input').get(0);
    resistanceInput.props.onResistanceChange(props.resistor.resistance); // nothing changes
    expect(props.onResistanceChange.mock.calls.length).toBe(0);
    resistanceInput.props.onResistanceChange(100);
    expect(props.onResistanceChange).toBeCalledWith(100);
  });

  it('calls onToleranceChange when the tolerance is changed', () => {
    const toleranceInput = wrapper.find('.Resistance__tolerance-input').get(0);
    toleranceInput.props.onToleranceChange(props.resistor.tolerance); // nothing changes
    expect(props.onToleranceChange.mock.calls.length).toBe(0);
    toleranceInput.props.onToleranceChange(10);
    expect(props.onToleranceChange).toBeCalledWith(10);
  });

  it('calls onBandsChange when the number of bands is changed', () => {
    const bandsInput = wrapper.find('.Resistance__bands-input').get(0);
    bandsInput.props.onBandsChange(props.resistor.bands); // nothing changes
    expect(props.onBandsChange.mock.calls.length).toBe(0);
    bandsInput.props.onBandsChange(4);
    expect(props.onBandsChange).toBeCalledWith(4);
  });

});
