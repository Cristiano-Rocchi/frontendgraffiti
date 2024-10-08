import { useEffect, useState } from "react";
import { Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../navbar/Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/navbar/img/Logo_scritta_bianca.png";
import CloseIcon from "../../assets/icons/delete.png";
import { useLocation } from "react-router-dom";

function Navbars() {
  //MODALE
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleShowInfo = () => setShowInfoModal(true);
  const handleCloseInfo = () => setShowInfoModal(false);
  const handleShowContact = () => setShowContactModal(true);
  const handleCloseContact = () => setShowContactModal(false);

  // SCROLLBAR CON FIXED CON DISSOLVENZA
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);

  const isGraffitiPage = location.pathname === "/graffiti";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const startDissolve = 100; // Dove inizia la dissolvenza
      const endDissolve = 1000; // Dove termina la dissolvenza

      if (scrollY < startDissolve) {
        setOpacity(1);
      } else if (scrollY >= startDissolve && scrollY <= endDissolve) {
        const newOpacity =
          1 - (scrollY - startDissolve) / (endDissolve - startDissolve);
        setOpacity(newOpacity);
      } else {
        setOpacity(0);
      }
    };

    if (isGraffitiPage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isGraffitiPage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isGraffitiPage]);

  return (
    <>
      <Navbar
        expand="lg"
        className={`navbarBody ${isGraffitiPage ? "sticky-navbar" : ""}`}
        style={{
          opacity: isGraffitiPage ? opacity : 1,
          transition: "opacity 0.5s ease",
        }}
      >
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
              <Nav.Link onClick={handleShowInfo}>Info</Nav.Link>
              <Link to={"/"} className="nav-link">
                Login
              </Link>
              <Link to={"/"} className="nav-link">
                Registrati
              </Link>
              <NavDropdown title="ESPLORA" id="basic-nav-dropdown">
                <NavDropdown.Item href="/graffiti">Graffiti</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Street-Art
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Tags</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modale principale */}
      <Modal
        show={showInfoModal}
        onHide={handleCloseInfo}
        className="custom-modal text-center"
      >
        <Modal.Header
          closeButton={false}
          className="d-flex justify-content-center"
        >
          <img src={Logo} alt="logo" className="logo-modal" />
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Informazioni</Modal.Title>
          <p>
            Questo sito nasce per gli artisti e per appassionati di arte di
            strada. Questo è un sito dedicato alla conservazione e alla
            documentazione di Graffiti, Tag e opere Street-Art, attraverso foto
            caricate da voi. Gli artisti o gli appassionati che caricheranno le
            proprie opere rimarranno sempre in forma anonima e le immagini
            caricate saranno conservate nel migliore dei modi nel tempo. <br />{" "}
            BUON VIAGGIO
          </p>
        </Modal.Body>
        <Modal.Footer>
          <h3 onClick={handleShowContact} className="contatti-link">
            Contatti
          </h3>
          <img
            src={CloseIcon}
            alt="Chiudi"
            onClick={handleCloseInfo}
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
          />
        </Modal.Footer>
      </Modal>

      {/* Modale dei contatti */}
      <Modal
        show={showContactModal}
        onHide={handleCloseContact}
        className="custom-modal-contact text-center"
      >
        <Modal.Body>
          <p>
            Per ogni informazione contattaci su Instagram:{" "}
            <a
              className="nav-link"
              href="https://www.instagram.com/creepyy.crawl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creepy.Crawl
            </a>
          </p>
          <img
            src={CloseIcon}
            alt="Chiudi"
            onClick={handleCloseContact}
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navbars;
