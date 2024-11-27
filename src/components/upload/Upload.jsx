import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Spinner,
  Alert,
} from "react-bootstrap";
import "../upload/Upload.css";
import Logo from "../../assets/navbar/img/Logo_scritta_bianca.png";
import { useNavigate } from "react-router-dom";
import LogoNero from "../../assets/register/LOGONERO.png";
import ArrowStyle from "../../assets/icons/arrowStyle.png";
import ArrowWhite from "../../assets/icons/white-line.png";
import CloseIcon from "../../assets/icons/delete.png";
import BASE_URL from "../../config";

function Upload() {
  const [formData, setFormData] = useState({
    tipo: "",
    luogo: "",
    artista: "",
    annoCreazione: "",
    stato: "",
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Resetta l'errore all'inizio del caricamento

    if (!formData.tipo) {
      setError("Devi selezionare il tipo di contenuto.");
      return;
    }

    if (!formData.img) {
      setError("L'immagine è obbligatoria.");
      return;
    }

    setLoading(true); // Mostra lo spinner

    try {
      const token = localStorage.getItem("token");

      let endpoint = "";
      switch (formData.tipo) {
        case "graffito":
          endpoint = "graffiti";
          break;
        case "streetart":
          endpoint = "streetart";
          break;
        case "tag":
          endpoint = "tags";
          break;
        default:
          endpoint = "graffiti";
      }

      const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          immagineUrl: "http://example.com/image.jpg", // Temporaneo
          stato: formData.stato,
          artista: formData.artista || "Sconosciuto",
          annoCreazione: formData.annoCreazione,
          luogo: formData.luogo,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }

      const objectData = await response.json();

      // Seconda chiamata: carica l'immagine
      const formDataToSend = new FormData();
      formDataToSend.append("img", formData.img);

      const responseImage = await fetch(
        `${BASE_URL}/${endpoint}/${objectData.id}/img`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (responseImage.ok) {
        setModalContent({
          title: "Immagine caricata con successo!",
          message:
            "L'immagine è stata caricata correttamente. Grazie per la condivisione.",
        });
        setShowModal(true);
        setLoading(false);
        setError(""); // Resetta l'errore dopo il caricamento
      } else {
        throw new Error("Errore durante il caricamento dell'immagine.");
      }
    } catch (error) {
      console.error("Errore completo:", error);

      if (error.errors && Object.keys(error.errors).length > 0) {
        const errorMessages = Object.values(error.errors).join("\n");
        setError(errorMessages);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Errore sconosciuto.");
      }

      setLoading(false);
    }
  };

  const handleRetry = () => {
    setShowModal(false);
  };

  const handleNewUpload = () => {
    setShowModal(false);
    setFormData({
      tipo: "",
      luogo: "",
      artista: "",
      annoCreazione: "",
      stato: "",
      img: null,
    });
  };

  const handleCloseCard = () => {
    navigate("/"); // Reindirizza alla home page quando l'icona viene cliccata
  };
  return (
    <>
      <Container className="upload-page d-flex justify-content-center align-items-center custom-container-upload">
        {/* Sezioni di testo animate */}
        <div className="animated-text">
          CREA IN STRADA, FOTOGRAFA E CARICA <br /> NOI CI PRENDEREMO CURA DELLE
          TUE OPERE
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
          OPPURE FOTOGRAFA LE OPERE NELLA TUA CITTA <br /> E CONDIVIDILE CON NOI
        </div>

        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <Card className="p-4 mt-4 position-relative">
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
              <Card.Body>
                <div className="text-center mb-4">
                  <img src={LogoNero} alt="Logo" className="register-logo" />
                  <h3 className="register-title">UPLOAD</h3>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {loading && (
                  <div className="text-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Caricamento...</span>
                    </Spinner>
                  </div>
                )}

                {!loading && (
                  <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Selezione tipo */}
                    <Form.Group controlId="formTipo" className="mb-3">
                      <Form.Label className="form-label">Tipo</Form.Label>
                      <Form.Control
                        className="input-gradient-border"
                        as="select"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleziona il tipo</option>
                        <option value="graffito">Graffito</option>
                        <option value="streetart">Street Art</option>
                        <option value="tag">Tag</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formLuogo" className="mb-3">
                      <Form.Label className="form-label">Luogo</Form.Label>
                      <Form.Control
                        className="input-gradient-border"
                        type="text"
                        placeholder="Inserisci il luogo"
                        name="luogo"
                        value={formData.luogo}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formArtista" className="mb-3">
                      <Form.Label className="form-label">
                        Artista (opzionale)
                      </Form.Label>
                      <Form.Control
                        className="input-gradient-border"
                        type="text"
                        placeholder="Inserisci l'artista"
                        name="artista"
                        value={formData.artista}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formAnno" className="mb-3">
                      <Form.Label className="form-label">
                        Anno di Creazione
                      </Form.Label>
                      <Form.Control
                        className="input-gradient-border"
                        type="number"
                        placeholder="Inserisci l'anno"
                        name="annoCreazione"
                        value={formData.annoCreazione}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formStato" className="mb-3">
                      <Form.Label className="form-label">Stato</Form.Label>
                      <Form.Control
                        className="input-gradient-border"
                        as="select"
                        name="stato"
                        value={formData.stato}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleziona lo stato</option>
                        <option value="CONSERVATO">Conservato</option>
                        <option value="DANNEGGIATO">Danneggiato</option>
                        <option value="RIMOSSO">Rimosso</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-label">Immagine</Form.Label>
                      <Form.Control
                        className="input-gradient-border"
                        type="file"
                        name="img"
                        onChange={handleFileChange}
                        required
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button type="submit" className="btn-custom-black">
                        Carica
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modale di successo o errore */}
        <Modal
          className="modal-upload"
          show={showModal}
          onHide={handleCloseModal}
          centered
        >
          <Modal.Header className="modal-upload-header">
            <img
              src={Logo}
              alt="Logo"
              className="modal-upload-logo"
              style={{ width: "200px", marginBottom: "10px" }}
            />
            <Modal.Title className="modal-upload-title p-2">
              {modalContent.title || "Errore caricamento Immagine"}{" "}
            </Modal.Title>
            <img
              src={CloseIcon}
              alt="Chiudi"
              onClick={handleCloseModal}
              className="modal-upload-close-icon"
            />
          </Modal.Header>

          <Modal.Body className="modal-upload-body">
            {modalContent.message || "Errore caricamento Immagine"}{" "}
          </Modal.Body>
          <Modal.Footer className="modal-upload-footer">
            <Button
              className="modal-upload-home-button"
              onClick={() => navigate("/")}
            >
              Torna alla Home
            </Button>
            <Button
              className="modal-upload-another-button"
              onClick={handleNewUpload}
            >
              Carica un'altra immagine
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Upload;
