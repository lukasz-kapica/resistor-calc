import React from 'react';
import PropTypes from 'prop-types';
import { toleranceAndColor, validResistance } from "../lib/ColorCode";

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function Resistance({
  resistor,
  onResistanceChange,
  onToleranceChange,
}) {

  const handleResistanceChange = (resistance) => {
    if (validResistance(resistance, resistor.bands) && +resistance !== resistor.resistance) {
      onResistanceChange(+resistance);
    }
  };

  const handleToleranceChange = tolerance =>
    tolerance !== resistor.tolerance && onToleranceChange(tolerance);

  const {resistance, tolerance} = resistor;

  const tolerances = toleranceAndColor.map(tc => tc[0]);

  return (
    <div className="Resistance">
      <Form>
        <Form.Row>

          <Form.Group as={Col} md="8">
            <Form.Label>Resistance [Ω]</Form.Label>
            <InputGroup>
              <FormControl
                className="mb-3 resistance-input"
                value={resistance}
                onChange={(e) => handleResistanceChange(e.target.value)}
                placeholder="Resistance"
                aria-label="Resistance"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Tolerance</Form.Label>
            <FormControl
              as="select"
              className="tolerance-input"
              value={tolerance}
              onChange={(e) => handleToleranceChange(+e.target.value)}
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

export default Resistance;
