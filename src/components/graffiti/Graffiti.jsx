import "../graffiti/Graffiti.css";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import GraffMonth from "../../assets/graffiti/img/graffiti_of_the_month.png";
import GraffSection from "../../assets/graffiti/img/graffitiSection.png";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import CloseIcon from "../../assets/icons/delete.png";
import ArrowDown from "../../assets/icons/grunge-graffiti-arrow-down-3081.svg";
import videoGraff from "../../assets/graffiti/vid/videowebsite.mp4";

const Graffiti = () => {
  const images = [
    "https://via.placeholder.com/300x300.png?text=Immagine+1",
    "https://via.placeholder.com/300x300.png?text=Immagine+2",
    "https://via.placeholder.com/300x300.png?text=Immagine+3",
    "https://via.placeholder.com/300x300.png?text=Immagine+4",
    "https://via.placeholder.com/300x300.png?text=Immagine+5",
    "https://via.placeholder.com/300x300.png?text=Immagine+6",
    "https://via.placeholder.com/300x300.png?text=Immagine+7",
    "https://via.placeholder.com/300x300.png?text=Immagine+8",
    "https://via.placeholder.com/300x300.png?text=Immagine+9",
    "https://via.placeholder.com/300x300.png?text=Immagine+10",
    "https://via.placeholder.com/300x300.png?text=Immagine+11",
    "https://via.placeholder.com/300x300.png?text=Immagine+12",
    "https://via.placeholder.com/300x300.png?text=Immagine+13",
    "https://via.placeholder.com/300x300.png?text=Immagine+14",
    "https://via.placeholder.com/300x300.png?text=Immagine+15",
    "https://via.placeholder.com/300x300.png?text=Immagine+16",
    "https://via.placeholder.com/300x300.png?text=Immagine+17",
    "https://via.placeholder.com/300x300.png?text=Immagine+18",
    "https://via.placeholder.com/300x300.png?text=Immagine+19",
    "https://via.placeholder.com/300x300.png?text=Immagine+20",
    "https://via.placeholder.com/300x300.png?text=Immagine+21",
    "https://via.placeholder.com/300x300.png?text=Immagine+22",
    "https://via.placeholder.com/300x300.png?text=Immagine+23",
    "https://via.placeholder.com/300x300.png?text=Immagine+24",
    "https://via.placeholder.com/300x300.png?text=Immagine+25",
    "https://via.placeholder.com/300x300.png?text=Immagine+26",
    "https://via.placeholder.com/300x300.png?text=Immagine+27",
    "https://via.placeholder.com/300x300.png?text=Immagine+28",
    "https://via.placeholder.com/300x300.png?text=Immagine+29",
    "https://via.placeholder.com/300x300.png?text=Immagine+30",
    "https://via.placeholder.com/300x300.png?text=Immagine+31",
    "https://via.placeholder.com/300x300.png?text=Immagine+32",
    "https://via.placeholder.com/300x300.png?text=Immagine+33",
    "https://via.placeholder.com/300x300.png?text=Immagine+34",
    "https://via.placeholder.com/300x300.png?text=Immagine+35",
    "https://via.placeholder.com/300x300.png?text=Immagine+36",
    "https://via.placeholder.com/300x300.png?text=Immagine+37",
    "https://via.placeholder.com/300x300.png?text=Immagine+38",
    "https://via.placeholder.com/300x300.png?text=Immagine+39",
    "https://via.placeholder.com/300x300.png?text=Immagine+40",
  ];

  const [loadedImages, setLoadedImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStatoOpera, setSelectedStatoOpera] = useState(""); // Stato dell'opera
  const [selectedAnno, setSelectedAnno] = useState(""); // Anno dell'opera
  const [selectedLuogo, setSelectedLuogo] = useState(""); // Luogo dell'opera

  useEffect(() => {
    setLoadedImages(images.slice(0, visibleCount));
  }, [visibleCount]);

  const loadMoreImages = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const handleImageClick = (image, artist) => {
    setSelectedImage(image);
    setSelectedArtist(artist);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
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
            <span>UPLOAD</span>{" "}
          </button>
          <button className="rounded-pill px-4 py-2 btn-style">
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
          {images.slice(0, 12).map((image, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                <img
                  className="imgCarousel"
                  src={image}
                  alt={`Immagine ${index + 1}`}
                  style={{
                    width: "250px",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "30px",
                  }}
                />
                <div className="artist-info rounded-pill">
                  <span>Artista {index + 1}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Container className="containerBody p-4 text-center">
        <img
          src={GraffSection}
          alt="graffiti section"
          className="graffSection"
        />
        <Row>
          {loadedImages.map((image, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div
                className="card-container"
                onClick={() => handleImageClick(image, `Artista ${index + 1}`)}
              >
                <img
                  className="card-img"
                  src={image}
                  alt={`Immagine ${index + 1}`}
                />
                <div className="card-info fs-5">
                  <p>
                    <span>a</span>Nome Artista {index + 1}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {visibleCount < images.length && (
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
                {" "}
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
