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
import SprayIcon from "../../assets/icons/spray-paint.png";
import BASE_URL from "../../config";

function Navbars() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null); // Stato per memorizzare lo username
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Controlla se l'utente è loggato leggendo il token JWT e lo username
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role"); // Recupera il ruolo

    if (token && storedUsername && storedRole) {
      setUsername(storedUsername);
      setRole(storedRole); // Imposta il ruolo dell'utente
    }
  }, []);

  const handleShowInfo = () => setShowInfoModal(true);
  const handleCloseInfo = () => setShowInfoModal(false);
  const handleShowContact = () => setShowContactModal(true);
  const handleCloseContact = () => setShowContactModal(false);
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Previeni il comportamento predefinito del form
    setIsLoading(true); // Mostra lo spinner
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Invia i dati del form al backend
      });

      if (response.ok) {
        const data = await response.json(); // Ottieni la risposta dal backend
        localStorage.setItem("token", data.token); // Salva il token JWT
        localStorage.setItem("username", data.username); // Salva lo username
        localStorage.setItem("email", data.email); // Salva l'email
        localStorage.setItem("role", data.ruolo); // Salva il ruolo (IMPORTANTE)

        // Imposta lo stato dell'utente e del ruolo
        setUsername(data.username); // Imposta lo username
        setRole(data.ruolo); // Imposta il ruolo
        setError(""); // Resetta eventuali errori precedenti
        handleCloseLogin(); // Chiudi il modale di login
        navigate("/"); // Reindirizza alla home
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Errore durante il login."); // Mostra un messaggio di errore
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setError("Errore di connessione al server."); // Mostra un errore di connessione
    } finally {
      setIsLoading(false); // Nascondi lo spinner
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Rimuovi il token dal localStorage
    localStorage.removeItem("username"); // Rimuovi lo username dal localStorage
    localStorage.removeItem("email"); // Rimuovi l'email dal localStorage
    localStorage.removeItem("role"); // Rimuovi l'ruolo dal localStorage
    setUsername(null); // Resetta lo stato dello username
    navigate("/"); // Reindirizza alla home
  };

  const location = useLocation();
  const [opacity, setOpacity] = useState(1);
  const isGraffitiPage = location.pathname === "/graffiti";
  const isProfilePage = location.pathname === "/profile";
  const isTagPage = location.pathname === "/tag";
  const isStreetArtPage = location.pathname === "/streetart";

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

    if (isGraffitiPage || isTagPage || isStreetArtPage) {
      window.addEventListener("scroll", handleScroll);
    } else if (isProfilePage) {
      setOpacity(1); // Fissa l'opacità a 1 su ProfilePage
    }

    return () => {
      if (isGraffitiPage || isTagPage || isStreetArtPage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isGraffitiPage, isTagPage, isStreetArtPage, isProfilePage]);

  const esploraLinks = (
    <>
      <Link
        className="nav-link"
        to="/graffiti"
        onClick={() => setIsDropdownOpen(false)}
      >
        Graffiti
      </Link>
      <Link
        className="nav-link"
        to="/streetart"
        onClick={() => setIsDropdownOpen(false)}
      >
        STREET-ART
      </Link>
      <Link
        className="nav-link"
        to="/tag"
        onClick={() => setIsDropdownOpen(false)}
      >
        TAGS
      </Link>
    </>
  );

  return (
    <>
      <Navbar
        expand="lg"
        className={`navbarBody custom-navbar-toggle ${
          isGraffitiPage || isTagPage || isStreetArtPage
            ? "fade-navbar"
            : isProfilePage
            ? "sticky-navbar"
            : ""
        }`}
        style={{
          opacity: isGraffitiPage || isTagPage || isStreetArtPage ? opacity : 1,
          transition:
            isGraffitiPage || isTagPage || isStreetArtPage
              ? "opacity 0.5s ease"
              : "none",
        }}
      >
        <Container>
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="logoImg" />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link
                to={"/"}
                className="nav-link"
                onClick={() => setIsDropdownOpen(false)}
              >
                Home
              </Link>
              <Nav.Link onClick={handleShowInfo}>Info</Nav.Link>
              {!username ? (
                <>
                  <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
                  <Link
                    to={"/register"}
                    className="nav-link"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Registrati
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/profile"}
                    className="nav-link"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profilo
                  </Link>
                  <Link
                    to={"/upload"}
                    className="nav-link"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Upload
                  </Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              )}
              <NavDropdown
                title="ESPLORA"
                id="basic-nav-dropdown"
                show={isDropdownOpen} // Controlla se il dropdown è visibile
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)} // Gestisce l'apertura/chiusura
              >
                <NavDropdown.Item
                  className="nav-link"
                  as={Link}
                  to="/graffiti"
                  onClick={() => {
                    setIsDropdownOpen(false); // Chiude il dropdown
                  }}
                >
                  Graffiti
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="nav-link"
                  as={Link}
                  to="/streetart"
                  onClick={() => {
                    setIsDropdownOpen(false); // Chiude il dropdown
                  }}
                >
                  STREET-ART
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="nav-link"
                  as={Link}
                  to="/tag"
                  onClick={() => {
                    setIsDropdownOpen(false); // Chiude il dropdown
                  }}
                >
                  TAGS
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {username && (
              <Nav className="ms-auto">
                {role === "ADMIN" ? (
                  <NavDropdown
                    title={
                      <>
                        <img
                          src={SprayIcon}
                          alt="logo"
                          className="logoImg"
                          style={{
                            width: "40px",
                          }}
                        />
                        {username}
                      </>
                    }
                    id="basic-nav-dropdown"
                    show={isDropdownOpen} // Controlla lo stato visibile
                    onToggle={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle apertura/chiusura
                  >
                    <NavDropdown.Item
                      className="text-white nav-link"
                      as={Link}
                      to="/profile"
                      onClick={() => {
                        setIsDropdownOpen(false); // Chiude il dropdown
                      }}
                    >
                      Profilo
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="text-white nav-link"
                      as={Link}
                      to="/admin"
                      onClick={() => {
                        setIsDropdownOpen(false); // Chiude il dropdown
                      }}
                    >
                      Admin
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    className="text-white"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img
                      src={SprayIcon}
                      alt="logo"
                      className="logoImg"
                      style={{
                        width: "40px",
                      }}
                    />
                    {username}
                  </Nav.Link>
                )}
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

      {/* Login Modale */}
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
            <Button
              type="submit"
              className="mt-3 btn-custom"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
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

      {/* Contact Modale */}
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
