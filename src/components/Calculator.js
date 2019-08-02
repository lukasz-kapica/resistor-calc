import React, { useState } from 'react';

import Resistance from './Resistance';
import ResistorSVG from './ResistorSVG';
import ESeries from './ESeries';
import Chart from './Chart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactSVG from 'react-svg';

import {
  resistorToCode,
  codeToResistor,
  getMagnitude,
} from '../lib/ColorCode';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const ResistorIcon = () => <ReactSVG
  className="resistor-icon"
  src={`${process.env.PUBLIC_URL}/resistor-icon.svg`}
/>;

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

  const handleBaseChange = (base) => {
    const newResistor = {resistance: base, tolerance, bands};
    const baseCode = resistorToCode(newResistor);
    const newCode = baseCode.slice(0, bands-2);
    newCode.push(code[bands-2]);
    newCode.push(code[bands-1]);
    setCode(newCode);
  };

  const resistance_str = getMagnitude(resistance);

  return (
    <div className="Calculator">
      <Navbar bg="dark" variant="dark" expand="md">
        <ResistorIcon />
        <Navbar.Brand href="#" className="navbar-title">Resistor Color Code Calculator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            activeKey={bands}
            onSelect={(selectedKey, e) => {
              e.preventDefault();
              handleResistorChange('bands')(selectedKey);
            }}
          >
            <Nav.Link href="4">4 bands</Nav.Link>
            <Nav.Link href="5">5 bands</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col className="first-column">
            <h2 className="resistor-info">{resistance_str}Ω ± {tolerance}%</h2>
            <ResistorSVG code={code} />
            <Resistance
              resistor={resistor}
              onResistanceChange={handleResistorChange('resistance')}
              onToleranceChange={handleResistorChange('tolerance')}
            />
            <ESeries
              bands={bands}
              onBaseChange={handleBaseChange}
              resistance={resistance} />
          </Col>
          <Col>
            <Chart code={code}
                   onCodeChange={(code) => setCode(code)}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Calculator;
