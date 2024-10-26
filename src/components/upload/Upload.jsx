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
} from "react-bootstrap";
import "../upload/Upload.css";
import { useNavigate } from "react-router-dom";
import LogoNero from "../../assets/register/LOGONERO.png";
import ArrowStyle from "../../assets/icons/arrowStyle.png";
import ArrowWhite from "../../assets/icons/white-line.png";
import CloseIcon from "../../assets/icons/delete.png"; // Import dell'icona di chiusura

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

      const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
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
        throw new Error("Errore durante la creazione dell'oggetto.");
      }

      const objectData = await response.json();

      // Seconda chiamata: carica l'immagine
      const formDataToSend = new FormData();
      formDataToSend.append("img", formData.img);

      const responseImage = await fetch(
        `http://localhost:3001/api/${endpoint}/${objectData.id}/img`,
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
          message: "L'immagine è stata caricata correttamente.",
        });
        setShowModal(true);
        setLoading(false);
        setError("");
      } else {
        throw new Error("Errore durante il caricamento dell'immagine.");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setModalContent({
        title: "Errore",
        message: error.message || "Errore durante il caricamento.",
      });
      setShowModal(true);
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
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control
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
                      <Form.Label>Luogo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci il luogo"
                        name="luogo"
                        value={formData.luogo}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formArtista" className="mb-3">
                      <Form.Label>Artista (opzionale)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci l'artista"
                        name="artista"
                        value={formData.artista}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formAnno" className="mb-3">
                      <Form.Label>Anno di Creazione</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Inserisci l'anno"
                        name="annoCreazione"
                        value={formData.annoCreazione}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formStato" className="mb-3">
                      <Form.Label>Stato</Form.Label>
                      <Form.Control
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
                      <Form.Label>Immagine</Form.Label>
                      <Form.Control
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header className="flex-column text-center">
            {/* Usa flex-column per impilare l'immagine e il titolo */}
            <img src={LogoNero} alt="Logo" className="register-logo mb-2" />
            {/* Immagine centrata sopra il titolo */}
            <Modal.Title className="w-100">{modalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent.title === "Errore" ? (
              <p>
                Errore durante la creazione dell'oggetto. <br /> Iscriviti per
                poter caricare un'immagine. <br /> Oppure torna alla Home per il
                Login.
              </p>
            ) : (
              <p className="text-center">
                L'immagine è stata caricata correttamente. <br /> Grazie per la
                condivisione.
              </p>
            )}
          </Modal.Body>
          <Modal.Footer className="w-100 d-flex justify-content-between">
            {modalContent.title === "Errore" ? (
              <div className="w-100 d-flex justify-content-between">
                <Button variant="primary" onClick={() => navigate("/register")}>
                  Iscriviti
                </Button>
                {/* Pulsante "Iscriviti" a sinistra */}
                <div>
                  <Button
                    variant="secondary"
                    onClick={handleRetry}
                    className="me-2"
                  >
                    Riprova
                  </Button>
                  <Button variant="primary" onClick={() => navigate("/")}>
                    Torna alla Home
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button variant="primary" onClick={() => navigate("/")}>
                  Torna alla Home
                </Button>
                <Button variant="secondary" onClick={handleNewUpload}>
                  Carica un'altra immagine
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Upload;
