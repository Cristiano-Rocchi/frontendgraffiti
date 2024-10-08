import { useState } from "react";
import {
  Button,
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "../navbar/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/navbar/img/Logo_scritta_bianca.png";

function Navbars() {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShow = () => setShowInfoModal(true);
  const handleClose = () => setShowInfoModal(false);
  return (
    <>
      <Navbar expand="lg" className="navbarBody">
        <Container>
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="logoImg" />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
              <Nav.Link onClick={handleShow}>Info</Nav.Link>
              <Link to={"/"} className="nav-link">
                Login
              </Link>
              <Link to={"/"} className="nav-link">
                Registrati
              </Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showInfoModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informazioi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Questo è il testo informativo che desideri mostrare. Puoi
            personalizzarlo come preferisci.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Navbars;
