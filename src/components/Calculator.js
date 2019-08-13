import React, { useState } from 'react';

import Resistance from './Resistance';
import ESeries from './ESeries';
import Chart from './Chart';
import NBar from './NBar';
import ResistorSVG from './ResistorSVG';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import {
  resistorToCode,
  codeToResistor,
  bandsToTolerances,
  bandsToDigits,
  figures,
} from '../lib/ColorCode';

import {
  magnitude,
  boundaries,
} from "../lib/utils";

import '../styles/Calculator.css';

function Calculator({
  code: initialCode = ["Orange", "Orange", "Brown", "Gold"], // 330 Ohms
}) {

  const [code, setCode] = useState(initialCode);

  const resistor = codeToResistor(code);
  const {resistance, tolerance, bands} = resistor;

  const handleResistorChange = property => value =>
    setCode(resistorToCode({
      ...resistor,
      [property]: value,
    }));

  const handleResistanceChange = handleResistorChange('resistance');
  const handleToleranceChange = handleResistorChange('tolerance');
  const handleBandsChange = handleResistorChange('bands');

  const handleBaseChange = base => {
    base = +base;
    const baseCode = resistorToCode({resistance: base, tolerance, bands});
    const digits = bandsToDigits(bands);
    const newCode = figures(baseCode);
    newCode.push(code[digits]);
    bands > 3 && newCode.push(code[digits+1]);
    setCode(newCode);
  };

  return (
    <div className="Calculator">
      <NBar bands={bands}
            onBandsChange={handleBandsChange} />
      <div className="wrapper">
        <Container className="main-container">
          <Row>
            <Col>
              <ResistorInfo resistance={resistance}
                            tolerance={tolerance} />
              <ResistorSVG code={code} />
              <Resistance
                resistor={resistor}
                tolerances={bandsToTolerances[bands]}
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

function ResistorInfo({
  resistance,
  tolerance,
}) {
  const resistanceStr = magnitude(resistance);
  const [lowerBound, upperBound] = boundaries(resistance, tolerance);
  const boundsStr = `${magnitude(lowerBound)}Ω - ${magnitude(upperBound)}Ω`;

  return (
    <h2 className="resistor-info">
      <span>{resistanceStr}Ω ± {tolerance}%</span>
      <Badge className="bounds">{boundsStr}</Badge>
    </h2>
  );
}

export default Calculator;
