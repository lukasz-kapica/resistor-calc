import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactSVG from 'react-svg';

const ResistorIcon = () =>
  <ReactSVG
    className="resistor-icon"
    src={`${process.env.PUBLIC_URL}/resistor-icon.svg`} />;

const GithubIcon = () =>
  <ReactSVG
    className="github-icon"
    src={`${process.env.PUBLIC_URL}/github-brands.svg`} />;

export default function NBar({
  bands,
  onBandsChange,
}) {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <ResistorIcon />
        <Navbar.Brand href="#" className="navbar-title">
          Resistor <span className="d-none d-sm-inline">Color Code</span> Calculator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            activeKey={bands}
            onSelect={(selectedKey, e) => {
              e.preventDefault();
              onBandsChange(selectedKey);
            }}
          >
            <Nav.Link href="3">3 bands</Nav.Link>
            <Nav.Link href="4">4 bands</Nav.Link>
            <Nav.Link href="5">5 bands</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            {/*<Nav.Item>
                <NavDropdown title="Language" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#polish">Polski</NavDropdown.Item>
                  <NavDropdown.Item href="#english">English</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>*/}
            <Nav.Link active={false} target="_blank" rel="noopener noreferrer" href="https://github.com/loocash/resistor-calc"><GithubIcon /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
