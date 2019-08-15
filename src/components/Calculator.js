import React, { useState } from 'react';

import {resistorToCode} from '../lib/resistor';
import {figures, properties, codeToResistor} from '../lib/code';

import NBar from './NBar';
import ResistorInfo from './ResistorInfo';
import ResistorSVG from './ResistorSVG';
import Resistance from './Resistance';
import ESeries from './ESeries';
import Chart from './Chart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/Calculator.css';

export default function Calculator({
  code: initialCode = ["Orange", "Orange", "Brown", "Gold"], // 330 Ohms
}) {

  const [code, setCode] = useState(initialCode);

  const resistor = codeToResistor(code);

  const handleResistorChange = property => value =>
    setCode(resistorToCode({
      ...resistor,
      [property]: +value,
    }));

  const handleResistanceChange = handleResistorChange('resistance');
  const handleToleranceChange  = handleResistorChange('tolerance');
  const handleBandsChange      = handleResistorChange('bands');

  const handleBaseChange = base => {
    const auxCode = resistorToCode({...resistor, resistance: +base});
    const newCode = [...figures(auxCode), ...properties(code)];
    setCode(newCode);
  };

  return (
    <div className="Calculator">
      <NBar bands={resistor.bands}
            onBandsChange={handleBandsChange} />
      <div className="wrapper">
        <Container className="main-container">
          <Row>
            <Col>
              <ResistorInfo resistor={resistor} />
              <ResistorSVG code={code} />
              <Resistance
                resistor={resistor}
                onResistanceChange={handleResistanceChange}
                onToleranceChange={handleToleranceChange} />
              <ESeries
                resistor={resistor}
                onBaseChange={handleBaseChange}
                onToleranceChange={handleToleranceChange} />
            </Col>
            <Col>
              <Chart code={code}
                     onCodeChange={setCode} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
