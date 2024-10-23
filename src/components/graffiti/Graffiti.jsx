import "../graffiti/Graffiti.css";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import GraffMonth from "../../assets/graffiti/img/graffiti_of_the_month.png";
import GraffSection from "../../assets/graffiti/img/graffitiSection.png";
import { Container, Row, Col, Modal } from "react-bootstrap";
import CloseIcon from "../../assets/icons/delete.png";
import ArrowDown from "../../assets/icons/graffitiarrowsvg.svg";
import videoGraff from "../../assets/graffiti/vid/videowebsite.mp4";
import { Link } from "react-router-dom";

const Graffiti = () => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]); // Stato per le immagini casuali
  const [visibleCount, setVisibleCount] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStatoOpera, setSelectedStatoOpera] = useState(""); // Stato dell'opera
  const [selectedAnno, setSelectedAnno] = useState(""); // Anno dell'opera
  const [selectedLuogo, setSelectedLuogo] = useState(""); // Luogo dell'opera

  const containerRef = useRef(null);

  // Carica immagini casuali per il carosello
  useEffect(() => {
    const fetchRandomImages = async () => {
      const richiesta = new Request(
        "http://localhost:3001/api/graffiti/random",
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        }
      );

      try {
        const response = await fetch(richiesta);
        if (response.ok) {
          const data = await response.json();
          setRandomImages(data); // Carica le immagini casuali
        } else {
          console.error("Errore nel caricamento delle immagini casuali");
        }
      } catch (error) {
        console.error("Errore nella richiesta delle immagini casuali:", error);
      }
    };

    fetchRandomImages();
  }, []);

  // Carica tutte le immagini dal database
  useEffect(() => {
    const fetchImages = async () => {
      const richiesta = new Request("http://localhost:3001/api/graffiti", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      });

      try {
        const response = await fetch(richiesta);
        if (response.ok) {
          const data = await response.json();
          setLoadedImages(data); // Carica tutte le immagini dal DB
        } else {
          console.error("Errore nel caricamento delle immagini");
        }
      } catch (error) {
        console.error("Errore nella richiesta delle immagini:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [showModal]);

  const loadMoreImages = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image.immagineUrl);
    setSelectedArtist(image.artista || "Artista Sconosciuto");
    setSelectedStatoOpera(image.stato || "Non Definito");
    setSelectedAnno(image.annoCreazione || "Anno Sconosciuto");
    setSelectedLuogo(image.luogo || "Luogo Non Definito");
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleGetInspiredClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="headerGraffiti text-center">
        <h1>
          The right destination <br /> for your graffiti
        </h1>
        <h3 className="mt-5">Upload a photo or get inspired</h3>
        <div
          style={{
            gap: "9rem",
          }}
          className="d-flex justify-content-center mt-5"
        >
          <button className="rounded-pill px-4 py-2 btn-style">
            <span>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/upload"}
              >
                UPLOAD
              </Link>
            </span>
          </button>
          <button
            className="rounded-pill px-4 py-2 btn-style"
            onClick={handleGetInspiredClick}
          >
            <span>GET INSPIRED</span>
          </button>
        </div>
      </div>

      <div className="video-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source src={videoGraff} type="video/mp4" />
          Il tuo browser non supporta il formato video.
        </video>
      </div>

      <div className="containerCarousel">
        <img
          src={GraffMonth}
          alt="graffiti of the month"
          className="graffMonth"
        />

        <Swiper
          slidesPerView={6}
          spaceBetween={100}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={3000}
          modules={[Autoplay]}
          className="mySwiper pb-3 pt-3"
        >
          {randomImages.slice(0, 12).map((image, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                <img
                  className="imgCarousel"
                  src={image.immagineUrl}
                  alt={image.artista || `Immagine ${index + 1}`}
                  style={{
                    width: "250px",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "30px",
                  }}
                />
                <div className="artist-info rounded-pill">
                  <span>{image.artista || "Artista Sconosciuto"}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Container ref={containerRef} className="containerBody p-4 text-center">
        <img
          src={GraffSection}
          alt="graffiti section"
          className="graffSection"
        />
        <Row>
          {loadedImages.slice(0, visibleCount).map((image, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div
                className="card-container"
                onClick={() => handleImageClick(image)}
              >
                <img
                  className="card-img"
                  src={image.immagineUrl}
                  alt={image.artista || `Immagine ${index + 1}`}
                />
                <div className="card-info fs-5">
                  <p>
                    <span>a</span>
                    {image.artista || "Artista Sconosciuto"}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {visibleCount < loadedImages.length && (
          <div className="text-center">
            <div onClick={loadMoreImages}>
              <img
                src={ArrowDown}
                className="arrow-svg"
                alt="Carica altre immagini"
              />
            </div>
          </div>
        )}
      </Container>

      {/* Modale per mostrare l'immagine ingrandita */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body className="text-center">
          {selectedImage && (
            <>
              <img
                src={selectedImage}
                alt={selectedArtist}
                className="modal-image"
              />
              <div className="d-flex justify-content-between">
                <div className="artist-info-modal mt-2 fs-3">
                  <span>{selectedArtist}</span>
                </div>
                <div className="stato-opera-modal mt-2">
                  <span>Stato: {selectedStatoOpera}</span>
                </div>
                <div className="anno-opera-modal mt-2">
                  <span>Anno: {selectedAnno}</span>
                </div>
                <div className="luogo-opera-modal mt-2">
                  <span>Luogo: {selectedLuogo}</span>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <img
            src={CloseIcon}
            alt="Close"
            onClick={handleClose}
            className="close-modal-icon"
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Graffiti;
