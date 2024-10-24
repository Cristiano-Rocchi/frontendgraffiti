import "../tags/tag.css";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TagMonth from "../../assets/graffiti/img/graffiti_of_the_month.png";
import TagSection from "../../assets/graffiti/img/graffitiSection.png";
import { Container, Row, Col, Modal } from "react-bootstrap";
import CloseIcon from "../../assets/icons/delete.png";
import ArrowDown from "../../assets/icons/graffitiarrowsvg.svg";
import videoTag from "../../assets/graffiti/vid/videowebsite.mp4";
import { Link } from "react-router-dom";

const Tag = () => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStatoOpera, setSelectedStatoOpera] = useState("");
  const [selectedAnno, setSelectedAnno] = useState("");
  const [selectedLuogo, setSelectedLuogo] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchRandomImages = async () => {
      const richiesta = new Request("http://localhost:3001/api/tags/random", {
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
          setRandomImages(data);
        } else {
          console.error("Errore nel caricamento delle immagini casuali");
        }
      } catch (error) {
        console.error("Errore nella richiesta delle immagini casuali:", error);
      }
    };

    fetchRandomImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const richiesta = new Request("http://localhost:3001/api/tags", {
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
          setLoadedImages(data);
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
      <div className="headerTag text-center">
        <h1>
          The right destination <br /> for your tags
        </h1>
        <h3 className="mt-5">Upload a photo or get inspired</h3>
        <div className="d-flex justify-content-center mt-5 tag-buttons">
          <button className="rounded-pill px-4 py-2 btn-style-tag">
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
            className="rounded-pill px-4 py-2 btn-style-tag"
            onClick={handleGetInspiredClick}
          >
            <span>GET INSPIRED</span>
          </button>
        </div>
      </div>

      <div className="video-container-tag">
        <video autoPlay muted loop playsInline className="background-video-tag">
          <source src={videoTag} type="video/mp4" />
          Il tuo browser non supporta il formato video.
        </video>
      </div>

      <div className="containerCarousel-tag">
        <img src={TagMonth} alt="tag of the month" className="tagMonth" />

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
          className="mySwiper-tag pb-3 pt-3"
        >
          {randomImages.slice(0, 12).map((image, index) => (
            <SwiperSlide key={index}>
              <div className="image-container-tag">
                <img
                  className="imgCarousel-tag"
                  src={image.immagineUrl}
                  alt={image.artista || `Immagine ${index + 1}`}
                  style={{
                    width: "250px",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "30px",
                  }}
                />
                <div className="artist-info-tag rounded-pill">
                  <span>{image.artista || "Artista Sconosciuto"}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Container
        ref={containerRef}
        className="containerBody-tag p-4 text-center"
      >
        <img src={TagSection} alt="tag section" className="tagSection" />
        <Row>
          {loadedImages.slice(0, visibleCount).map((image, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div
                className="card-container-tag"
                onClick={() => handleImageClick(image)}
              >
                <img
                  className="card-img-tag"
                  src={image.immagineUrl}
                  alt={image.artista || `Immagine ${index + 1}`}
                />
                <div className="card-info-tag fs-5">
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
                className="arrow-svg-tag"
                alt="Carica altre immagini"
              />
            </div>
          </div>
        )}
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body className="text-center">
          {selectedImage && (
            <>
              <img
                src={selectedImage}
                alt={selectedArtist}
                className="modal-image-tag"
              />
              <div className="d-flex justify-content-between">
                <div className="artist-info-modal-tag mt-2 fs-3">
                  <span>{selectedArtist}</span>
                </div>
                <div className="stato-opera-modal-tag mt-2">
                  <span>Stato: {selectedStatoOpera}</span>
                </div>
                <div className="anno-opera-modal-tag mt-2">
                  <span>Anno: {selectedAnno}</span>
                </div>
                <div className="luogo-opera-modal-tag mt-2">
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

export default Tag;
