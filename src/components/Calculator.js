import React, { useState } from 'react';

import Resistance from './Resistance';
import ResistorSVG from './ResistorSVG';
import ESeries from './ESeries';
import Chart from './Chart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import ReactSVG from 'react-svg';

import {
  resistorToCode,
  codeToResistor,
  getMagnitude,
  bandsToTolerances, getBounds,
} from '../lib/ColorCode';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const ResistorIcon = () => <ReactSVG
  className="resistor-icon"
  src={`${process.env.PUBLIC_URL}/resistor-icon.svg`}
/>;

const GithubIcon = () => <ReactSVG
  className="github-icon"
  src={`${process.env.PUBLIC_URL}/github-brands.svg`}
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
  const [lowerBound, upperBound] = getBounds(resistance, tolerance);
  const boundsStr = `${getMagnitude(lowerBound)}Ω - ${getMagnitude(upperBound)}Ω`;

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
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link active={false} target="_blank" rel="noopener noreferrer" href="https://github.com/loocash/resistor-calc"><GithubIcon /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col className="first-column">
            <h2 className="resistor-info">{resistance_str}Ω ± {tolerance}%
              <Badge style={{verticalAlign: 'middle', marginLeft: '0.5rem', fontSize: '1.25rem'}} variant="secondary">{boundsStr}</Badge>
            </h2>
            <ResistorSVG code={code} />
            <Resistance
              resistor={resistor}
              tolerances={bandsToTolerances[bands]}
              onResistanceChange={handleResistorChange('resistance')}
              onToleranceChange={handleResistorChange('tolerance')}
            />
            <ESeries
              bands={bands}
              onBaseChange={handleBaseChange}
              onToleranceChange={handleResistorChange('tolerance')}
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
