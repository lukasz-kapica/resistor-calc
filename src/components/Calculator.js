import React, { useState } from 'react';

import {resistorToCode, bandsToDigits} from '../lib/resistor';
import {figures, codeToResistor} from '../lib/code';

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
    base = +base;
    const {bands} = resistor;
    const digits = bandsToDigits(bands);
    const newCode = figures(resistorToCode({...resistor, resistance: base}));
    newCode.push(code[digits]);
    bands > 3 && newCode.push(code[digits+1]);
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
