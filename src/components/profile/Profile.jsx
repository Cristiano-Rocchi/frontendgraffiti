import { Col, Container, Row, Button, Dropdown, Modal } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import "../profile/Profile.css"; // Il CSS aggiornato con classi personalizzate
import HelloImg from "../../assets/profile/img/Hello.jpg";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // Stato per gestire lo username
  const [images, setImages] = useState([]); // Stato per le immagini
  const [showImages, setShowImages] = useState(false); // Stato per mostrare le immagini
  const [category, setCategory] = useState("graffiti"); // Stato per gestire la categoria selezionata
  const [selectedImage, setSelectedImage] = useState(null); // Stato per l'immagine selezionata
  const [showModal, setShowModal] = useState(false); // Stato per la modal
  const imageCardRef = useRef(null); // Crea un ref per la card delle immagini

  useEffect(() => {
    const leftElement = document.querySelector(".profile-left-sect");
    const rightElement = document.querySelector(".profile-right-sect");

    leftElement.classList.add("profile-slide-in-left");
    rightElement.classList.add("profile-slide-in-right");

    // Recupera lo username dal localStorage, esattamente come nella navbar
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername); // Imposta lo username dallo stato
  }, []);

  // Scrolla automaticamente quando showImages diventa true
  useEffect(() => {
    if (showImages) {
      imageCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showImages]);

  // Fetch per graffiti
  const fetchGraffitiImages = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/graffiti/user-images",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const userImages = await response.json();
        setImages(userImages);
        setShowImages(true); // Imposta true per mostrare le immagini e attivare lo scroll
      } else {
        console.error(
          "Errore durante il caricamento delle immagini dei graffiti"
        );
      }
    } catch (error) {
      console.error(
        "Errore nel caricamento delle immagini dei graffiti",
        error
      );
    }
  };

  // Funzione per aprire la modal con l'immagine selezionata
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setShowModal(true);
  };

  // Funzione per chiudere la modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // Fetch per street art
  const fetchStreetArtImages = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/streetart/user-images",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const userImages = await response.json();
        setImages(userImages);
        setShowImages(true); // Imposta true per mostrare le immagini e attivare lo scroll
      } else {
        console.error(
          "Errore durante il caricamento delle immagini di street art"
        );
      }
    } catch (error) {
      console.error(
        "Errore nel caricamento delle immagini di street art",
        error
      );
    }
  };

  // Fetch per tag
  const fetchTagImages = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/tags/user-images",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const userImages = await response.json();
        setImages(userImages);
        setShowImages(true); // Imposta true per mostrare le immagini e attivare lo scroll
      } else {
        console.error("Errore durante il caricamento delle immagini di tag");
      }
    } catch (error) {
      console.error("Errore nel caricamento delle immagini di tag", error);
    }
  };

  // Gestisci il cambio di categoria
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    switch (selectedCategory) {
      case "graffiti":
        fetchGraffitiImages();
        break;
      case "street-art":
        fetchStreetArtImages();
        break;
      case "tag":
        fetchTagImages();
        break;
      default:
        fetchGraffitiImages(); // Default come graffiti
    }
  };

  // Funzione per cancellare un'immagine
  const handleDelete = async (id) => {
    let url;
    switch (category) {
      case "graffiti":
        url = `http://localhost:3001/api/graffiti/${id}`;
        break;
      case "street-art":
        url = `http://localhost:3001/api/streetart/${id}`;
        break;
      case "tag":
        url = `http://localhost:3001/api/tags/${id}`;
        break;
      default:
        url = `http://localhost:3001/api/graffiti/${id}`; // Default come graffiti
    }

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setImages(images.filter((img) => img.id !== id)); // Rimuovi l'immagine dalla lista
        setShowModal(false); // Chiudi la modal dopo aver cancellato
        console.log("Immagine cancellata con successo");
      } else {
        const errorText = await response.text();
        console.error(
          "Errore durante la cancellazione dell'immagine:",
          errorText
        );
      }
    } catch (error) {
      console.error("Errore nella richiesta di cancellazione", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="username-div text-center pt-5 pb-5 position-relative">
        <div className="username-text">{username || "NOME UTENTE"}</div>
        <img className="img-hello" src={HelloImg} alt="Hello My Name Is" />
      </div>
      <Container>
        <Row>
          <Col xs="6" className="profile-left-sect">
            <h3>
              CIAO {username?.toUpperCase() || "NOME UTENTE"} <br /> QUI PUOI
              GESTIRE IL TUO PROFILO, TENERE TRACCIA DELLE IMMAGINI CARICATE,
              MODIFICARLE O RIMUOVERLE SE VUOI
            </h3>
          </Col>
          <Col xs="6" className="profile-right-sect text-center">
            <Button
              className="custom-btn-profile mb-3 rounded-pill"
              onClick={fetchGraffitiImages}
            >
              Immagini
            </Button>
            <Button
              className="custom-btn-profile rounded-pill"
              onClick={() => navigate("/profile")}
            >
              Profilo
            </Button>
          </Col>
        </Row>

        {/* Card che mostra le immagini */}
        {showImages && (
          <Row className="mt-4" ref={imageCardRef}>
            <Col xs="12">
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>
                    {category === "graffiti"
                      ? "Graffiti"
                      : category === "street-art"
                      ? "Street Art"
                      : "Tag"}
                  </h4>
                  {/* Dropdown per scegliere tra Graffiti, Street Art o Tag */}
                  <Dropdown onSelect={handleCategoryChange}>
                    <Dropdown.Toggle
                      variant="secondary"
                      className="rounded-pill"
                      id="dropdown-basic"
                    >
                      Seleziona Categoria
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="graffiti">
                        Graffiti
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="street-art">
                        Street Art
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="tag">Tag</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <Row className="mt-3">
                  {images.length > 0 ? (
                    images.map((img, index) => (
                      <Col
                        key={index}
                        md={4}
                        className="mb-3 d-flex justify-content-center"
                        onClick={() => handleImageClick(img)} // Apre la modal al click sull'immagine
                      >
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={img.immagineUrl}
                            alt={`Immagine ${index + 1}`}
                          />
                          <div className="card-body">
                            <div className="info p-3">
                              <p>{img.artista || "Artista Sconosciuto"}</p>
                              <p>{img.annoCreazione || "Anno Sconosciuto"}</p>
                              <p>{img.stato || "Stato Non Definito"}</p>
                            </div>
                            <Button
                              className="delete-btn rounded-pill mb-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(img.id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <p>Nessuna immagine caricata.</p>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {/* Modal che mostra l'immagine a schermo intero */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0">
          {selectedImage && (
            <div className="modal-image-container">
              <img
                src={selectedImage.immagineUrl}
                alt={selectedImage.artista || "Artista Sconosciuto"}
                className="img-fluid w-100"
              />
              <Button
                variant="danger"
                className="delete-btn rounded-pill"
                onClick={() => handleDelete(selectedImage.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
