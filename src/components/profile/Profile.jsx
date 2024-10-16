import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../profile/Profile.css";
import HelloImg from "../../assets/profile/img/Hello.jpg";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null); // Stato per gestire lo username
  const [images, setImages] = useState([]); // Stato per le immagini
  const [showImages, setShowImages] = useState(false); // Stato per mostrare le immagini

  useEffect(() => {
    const leftElement = document.querySelector(".profile-left-sect");
    const rightElement = document.querySelector(".profile-right-sect");

    leftElement.classList.add("profile-slide-in-left");
    rightElement.classList.add("profile-slide-in-right");

    // Recupera lo username dal localStorage, esattamente come nella navbar
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername); // Imposta lo username dallo stato
  }, []);

  const handleShowImages = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/graffiti/user-images",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userImages = await response.json();
      setImages(userImages);
      setShowImages(true); // Mostra la sezione delle immagini
    } catch (error) {
      console.error("Errore nel caricamento delle immagini dell'utente", error);
    }
  };

  return (
    <>
      <div className="username-div text-center pt-5 pb-5 position-relative">
        <div className="username-text">{username || "NOME UTENTE"}</div>{" "}
        {/* Usa lo username */}
        <img className="img-hello" src={HelloImg} alt="Hello My Name Is" />
      </div>
      <Container>
        <Row>
          <Col xs="6" className="profile-left-sect">
            <h3>
              CIAO {username || "NOME UTENTE"} <br /> QUI PUOI GESTIRE IL TUO
              PROFILO, TENERE TRACCIA DELLE IMMAGINI CARICATE, MODIFICARLE O
              RIMUOVERLE SE VUOI
            </h3>
          </Col>
          <Col xs="6" className="profile-right-sect text-center">
            <button className="btn btn-primary mb-3" onClick={handleShowImages}>
              Immagini
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/profile")}
            >
              Profilo
            </button>
          </Col>
        </Row>

        {showImages && (
          <Row className="mt-4">
            {images.length > 0 ? (
              images.map((img, index) => (
                <Col key={index} md={4} className="mb-3">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={img.immagineUrl}
                      alt={`Immagine ${index + 1}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {img.artista || "Artista Sconosciuto"}
                      </h5>
                      <p className="card-text">
                        Anno di Creazione: {img.annoCreazione || "Sconosciuto"}
                      </p>
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
        )}
      </Container>
    </>
  );
}

export default Profile;
