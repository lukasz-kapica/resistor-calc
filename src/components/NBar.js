import React from 'react';
import PropTypes from 'prop-types';

import About from './About';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactSVG from 'react-svg';

import styles from '../styles/NBar.module.css';

const ResistorIcon = () =>
  <ReactSVG
    className={styles.resistorIcon}
    src={`${process.env.PUBLIC_URL}/resistor-icon.svg`} />;

export default function NBar({
  bands,
  onBandsChange,
}) {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className={styles.Navbar}>
      <Container>
        <ResistorIcon />
        <Navbar.Brand href="#" className={styles.brand}>
          Resistor <span className="d-none d-sm-inline">Color Code</span> Calculator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            activeKey={bands}
            onSelect={key => onBandsChange(+key)}
          >
            <Nav.Link eventKey="3">3 bands</Nav.Link>
            <Nav.Link eventKey="4">4 bands</Nav.Link>
            <Nav.Link eventKey="5">5 bands</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <About />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NBar.propTypes = {
  bands: PropTypes.number.isRequired,
  onBandsChange: PropTypes.func.isRequired,
};
