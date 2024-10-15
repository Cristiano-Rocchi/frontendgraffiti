import "../Register/Register.css";
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
      const response = await fetch("http://localhost:3001/auth/register", {
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
        setError(errorData.message || "Errore durante la registrazione");
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
      <Container className="register-page d-flex justify-content-center align-items-center custom-container">
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
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Inserisci email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
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

                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Conferma Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Conferma password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Registrazione completata</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Registrazione avvenuta con successo!</p>
            <Link to="/" className="btn btn-primary">
              Torna alla Home
            </Link>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Register;
