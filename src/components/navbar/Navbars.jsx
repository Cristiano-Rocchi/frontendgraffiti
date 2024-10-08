import { useState } from "react";
import { Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../navbar/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/navbar/img/Logo_scritta_bianca.png";
import CloseIcon from "../../assets/icons/delete.png";

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

      <Modal
        show={showInfoModal}
        onHide={handleClose}
        className="custom-modal text-center"
      >
        <Modal.Header
          closeButton={false}
          className="d-flex justify-content-center"
        >
          {" "}
          <img src={Logo} alt="logo" className="logo-modal" />
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Informazioni</Modal.Title>
          <p>
            Questo sito nasce per gli artisti e per appassionati di arte di
            strada. questo è un sito dedicato alla conservazione e alla
            documentazione di Graffiti, Tag e opere Street-Art, attraverso foto
            caricate da voi. Gli Artisti o gli appassionati che caricheranno le
            proprie opere rimarrano sempre in forma anonima e le immagini
            caricate saranno conservate nel migliore dei modi nel tempo. <br />{" "}
            BUON VIAGGIO
          </p>
        </Modal.Body>
        <Modal.Footer>
          <h3>Contatti</h3>
          {/* Immagine PNG come pulsante di chiusura */}
          <img
            src={CloseIcon}
            alt="Chiudi"
            onClick={handleClose}
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Navbars;
