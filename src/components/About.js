import React, {useState} from 'react';

import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';

export default function About() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link onClick={handleShow}>
        About
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          This is a tool for electronics hobbyists to help them in identifying
          resistors depending on their color code and parameters like resistance and tolerance.

          <br/>
          <br/>

          This project is <a target="_blank" rel="noopener noreferrer" href="https://github.com/loocash/resistor-calc">
            open source
          </a> and is licensed under the MIT License.

          <br/>
          <br/>

          Last but not least, I strongly recommend you checking all of
          your resistors with multimeter before using them in real projects.

        </Modal.Body>
      </Modal>
    </>
  );
}
