import { useEffect, useState } from "react";
import {
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import "../navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/navbar/img/Logo_scritta_bianca.png";
import CloseIcon from "../../assets/icons/delete.png";
import { useLocation } from "react-router-dom";

function Navbars() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null); // Stato per memorizzare lo username
  const navigate = useNavigate();

  // Controlla se l'utente è loggato leggendo il token JWT e lo username
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (token && storedUsername) {
      setUsername(storedUsername); // Imposta lo username se l'utente è loggato
    }
  }, []);

  const handleShowInfo = () => setShowInfoModal(true);
  const handleCloseInfo = () => setShowInfoModal(false);
  const handleShowContact = () => setShowContactModal(true);
  const handleCloseContact = () => setShowContactModal(false);
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Salva il token JWT
        localStorage.setItem("username", data.username); // Salva lo username
        setUsername(data.username); // Imposta lo username nello stato
        setError("");
        handleCloseLogin(); // Chiudi il modale
        navigate("/"); // Reindirizza alla home
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Errore durante il login.");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setError("Errore di connessione al server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Rimuovi il token dal localStorage
    localStorage.removeItem("username"); // Rimuovi lo username dal localStorage
    setUsername(null); // Resetta lo stato dello username
    navigate("/"); // Reindirizza alla home
  };

  const location = useLocation();
  const [opacity, setOpacity] = useState(1);
  const isGraffitiPage = location.pathname === "/graffiti";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const startDissolve = 100;
      const endDissolve = 1000;

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
            {/* Prima del login tutti gli elementi allineati a sinistra */}
            <Nav className="me-auto">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
              <Nav.Link onClick={handleShowInfo}>Info</Nav.Link>
              {!username ? (
                <>
                  <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
                  <Link to={"/register"} className="nav-link">
                    Registrati
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/profile"} className="nav-link">
                    Profilo
                  </Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              )}
              <NavDropdown title="ESPLORA" id="basic-nav-dropdown">
                <Link className="nav-link" to={"/graffiti"}>
                  Graffiti
                </Link>
                <NavDropdown.Item href="#action/3.2">
                  Street-Art
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Tags</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* Dopo il login "Benvenuto" allineato a destra */}
            {username && (
              <Nav className="ms-auto">
                <Nav.Link>Benvenuto, {username}</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Info Modal */}
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
            caricate da voi.
            <br /> BUON VIAGGIO
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

      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={handleCloseLogin}
        className="custom-modal text-center"
      >
        <Modal.Header
          closeButton={false}
          className="d-flex justify-content-center"
        >
          <img src={Logo} alt="logo" className="logo-modal" />
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Login</Modal.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <img
            src={CloseIcon}
            alt="Chiudi"
            onClick={handleCloseLogin}
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
          />
        </Modal.Footer>
      </Modal>

      {/* Contact Modal */}
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
