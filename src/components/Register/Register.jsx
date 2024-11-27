import "../Register/Register.css";
import Logo from "../../assets/navbar/img/Logo_scritta_bianca.png";
import LogoNero from "../../assets/register/LOGONERO.png";
import CloseIcon from "../../assets/icons/delete.png";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ArrowStyle from "../../assets/icons/arrowStyle.png";
import ArrowWhite from "../../assets/icons/white-line.png";
import BASE_URL from "../config";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Stato per mostrare il modale
  const navigate = useNavigate(); // Hook per la navigazione

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controllo se le password coincidono
    if (formData.password !== formData.confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Utente registrato con successo:", data);
        setShowSuccessModal(true); // Mostra il modale di successo
      } else {
        const errorData = await response.json();

        // Estrai solo il messaggio rilevante
        const extractedMessage =
          errorData.message?.split(". ").slice(-1)[0] ||
          errorData.message ||
          "Errore durante la registrazione.";
        setError(extractedMessage);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setError("Errore di connessione al server.");
    }
  };

  // Funzione per gestire il click sull'icona di chiusura
  const handleCloseCard = () => {
    navigate("/"); // Reindirizza alla home page
  };

  return (
    <>
      <Container className="register-page d-flex justify-content-center align-items-center custom-container-register">
        {/* Sezioni di testo animate */}
        <div className="animated-text">
          UNISCITI A NOI E CARICA I TUOI GRAFFITI <br /> O QUELLI CHE TROVI
          NELLA TUA CITTA. <br /> NOI LI CONSERVEREMO PER TE.
          <div className="">
            <img
              src={ArrowStyle}
              className="arrow-right "
              alt="icona freccia"
            />
          </div>
        </div>
        <div className="animated-text second">
          <div className="d-block left-sect">
            <img src={ArrowWhite} className="arrow-left " alt="icona freccia" />
          </div>
          PRENDI ISPIRAZIONE DALLE OPERE DEGLI ALTRI. <br /> OPPURE DIMOSTRA IL
          TUO STILE.
        </div>
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <Card className="register-card p-4">
              <Card.Body>
                {/* Icona di chiusura */}
                <img
                  src={CloseIcon}
                  alt="Chiudi"
                  onClick={handleCloseCard}
                  style={{
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                />

                <div className="text-center mb-4">
                  <img src={LogoNero} alt="Logo" className="register-logo" />
                  <h3 className="register-title">UNISCITI A NOI</h3>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control
                      className="input-gradient-border"
                      type="text"
                      placeholder="Inserisci username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control
                      className="input-gradient-border"
                      type="email"
                      placeholder="Inserisci email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                      className="input-gradient-border"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label className="form-label">
                      Conferma Password
                    </Form.Label>
                    <Form.Control
                      className="input-gradient-border"
                      type="password"
                      placeholder="Conferma password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button className="custom-btn-reg" type="submit">
                      Let's Go
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal
          className="custom-modal"
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          centered
        >
          <Modal.Header>
            <div className="w-100 text-center">
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "200px", marginBottom: "10px" }}
              />
              <Modal.Title className="modal-reg-title">
                Registrazione completata
              </Modal.Title>
            </div>
            <img
              src={CloseIcon}
              alt="Chiudi"
              onClick={() => setShowSuccessModal(false)}
              className="close-modal-icon"
              style={{
                cursor: "pointer",
                width: "24px",
                height: "24px",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
          </Modal.Header>
          <Modal.Body className="text-center fs-5 p-5">
            <p className="reg-modal-body">
              Registrazione avvenuta con successo!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button className="home-button" onClick={() => navigate("/")}>
              Torna alla Home
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Register;
