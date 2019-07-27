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

function Calculator() {

  const [code, setCode] = useState(["Brown", "Orange", "Black", "Black", "Gold"]);

  const resistor = codeToResistor(code);
  const {resistance, tolerance, bands} = resistor;

  const handleResistorChange = (property) => (newValue) => {
    const newCode = resistorToCode({...resistor, [property]: newValue});
    setCode(newCode);
  };

  const resistance_str = getMagnitude(resistance);

  return (
    <div className="Calculator">
      <Navbar bg="dark" variant="dark">
        <ResistorIcon />
        <Navbar.Brand href="#">Resistor Color Code Calculator</Navbar.Brand>
        <Nav
          activeKey={bands}
          onSelect={(selectedKey, e) => {
            e.preventDefault();
            handleResistorChange('bands')(selectedKey);
          }}
        >
          <Nav.Link href="4">4 bands</Nav.Link>
          <Nav.Link href="5">5 bands</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h2 className="resistor-info">{resistance_str}Ω ± {tolerance}%</h2>
            <ResistorSVG code={code} />
            <Resistance
              resistor={resistor}
              onResistanceChange={handleResistorChange('resistance')}
              onToleranceChange={handleResistorChange('tolerance')}
            />
            <h5>E-Series</h5>
            <ESeries resistance={resistance} />
          </Col>
          <Col>
            <Chart code={code} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Calculator;
