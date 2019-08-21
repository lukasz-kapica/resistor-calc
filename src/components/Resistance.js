import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {bandsToTolerances, validResistance} from "../lib/resistor";

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import styles from '../styles/Resistance.module.css';

export default function Resistance({
  resistor,
  onResistanceChange,
  onToleranceChange,
}) {

  const {resistance, tolerance, bands} = resistor;
  const tolerances = bandsToTolerances[bands];

  const [resInput, setResInput] = useState(resistance);

  useEffect(() => setResInput(resistance), [resistance]);

  const handleResistanceChange = resistance => {
    if (validResistance(+resistance, bands))
      onResistanceChange(+resistance);
    setResInput(resistance);
  };

  const isValid = validResistance(+resInput, bands);

  return (
    <div className="Resistance">
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Row>

          <Form.Group as={Col} xs="8">
            <Form.Label>Resistance</Form.Label>
            <InputGroup size="sm">
              <FormControl
                className={isValid ? '' : styles.invalid}
                value={resInput}
                onChange={e => handleResistanceChange(e.target.value)}
                placeholder="Resistance"
                aria-label="Resistance"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">Ω</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} xs="4">
            <Form.Label>Tolerance</Form.Label>
            <FormControl
              size="sm"
              as="select"
              aria-label="Tolerance"
              value={tolerance}
              onChange={e => onToleranceChange(+e.target.value)}
              disabled={tolerances.length === 1}
            >
              {tolerances.map(t => <option key={t} value={t}>{t}%</option>)}
            </FormControl>
          </Form.Group>

        </Form.Row>
      </Form>
    </div>
  );
}

Resistance.propTypes = {
  resistor: PropTypes.object.isRequired,
  onResistanceChange: PropTypes.func.isRequired,
  onToleranceChange: PropTypes.func.isRequired,
};
