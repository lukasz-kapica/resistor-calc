import React from 'react';
import Bands, {ColorSelect, pluckSecond} from '../components/Bands';
import {valueAndColor, multiplierAndColor, toleranceAndColor} from '../lib/ColorCode';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Bands />', () => {

  let wrapper, props;

  const sampleProps = () => ({
    onCodeChange: jest.fn(),
    code: ["Brown", "Orange", "Black", "Black", "Gold"],
  });

  beforeEach(() => {
    props = sampleProps();
    wrapper = shallow(<Bands {...props} />);
  });

  it('renders ColorSelect for every color in the code array', () => {
    const renderedCode = wrapper.find('ColorSelect').map(tag => tag.props().value);
    expect(renderedCode).toEqual(props.code);
  });

  it('renders ColorSelects for digits', () => {
    const numberOfDigits = props.code.length - 2;
    const digitSelects = wrapper.find('ColorSelect').slice(0, numberOfDigits);
    const digitColors = pluckSecond(valueAndColor);
    digitSelects.forEach(digitSelect => {
      const colors = digitSelect.props().colors;
      expect(colors).toEqual(digitColors);
    });
  });

  it('renders ColorSelect for multiplier', () => {
    const multiplierIndex = props.code.length - 2;
    const multiplierSelect = wrapper.find('ColorSelect').get(multiplierIndex);
    const multiplierColors = pluckSecond(multiplierAndColor);
    const colors = multiplierSelect.props.colors;
    expect(colors).toEqual(multiplierColors);
  });

  it('renders ColorSelect for tolerance', () => {
    const toleranceIndex = props.code.length - 1;
    const toleranceSelect = wrapper.find('ColorSelect').get(toleranceIndex);
    const toleranceColors = pluckSecond(toleranceAndColor);
    const colors = toleranceSelect.props.colors;
    expect(colors).toEqual(toleranceColors);
  });

  it('calls onCodeChange when the code is changed', () => {
    const firstDigit = wrapper.find('ColorSelect').get(0);
    firstDigit.props.onColorChange("Brown"); // so nothing really changes
    expect(props.onCodeChange.mock.calls.length).toBe(0);
    firstDigit.props.onColorChange("Red");
    expect(props.onCodeChange).toBeCalledWith(["Red", ...props.code.slice(1)]);
  });

});

describe('<ColorSelect />', () => {

  let wrapper, props;

  const sampleProps = () => ({
    value: "Red",
    onColorChange: jest.fn(),
    title: "Band 1",
    colors: ["Red", "Black", "Orange"],
  });

  beforeEach(() => {
    props = sampleProps();
    wrapper = shallow(<ColorSelect {...props} />);
  });

  it('renders a title', () => {
    const actual = wrapper.find('.ColorSelect__title').text();
    expect(actual).toBe(props.title);
  });

  it('renders <select> tag with all given colors as options and proper value selected', () => {
    const actual = wrapper.find('option').map(tag => tag.text());
    expect(actual).toEqual(props.colors);
    expect(wrapper.find('select').props().value).toBe(props.value);
  });

  it('calls onColorChange when new color is selected', () => {
    const select = wrapper.find('select');
    select.simulate('change', {target:{ value: "Red" }}); // Simulate choosing the same color
    expect(props.onColorChange.mock.calls.length).toBe(0);
    select.simulate('change', {target:{ value: "Black" }}); // Simulate choosing different color
    expect(props.onColorChange).toBeCalledWith("Black");
  });

});
