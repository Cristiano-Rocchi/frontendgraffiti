import "../tags/tag.css";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TagMonth from "../../assets/graffiti/img/graffiti_of_the_month.png";
import TagSection from "../../assets/graffiti/img/graffitiSection.png";
import { Container, Modal } from "react-bootstrap";
import CloseIcon from "../../assets/icons/delete.png";
import ArrowDown from "../../assets/icons/graffitiarrowsvg.svg";
import videoTag from "../../assets/graffiti/vid/videotag.mp4";
import BackImg from "../../assets/graffiti/img/sfondo2.jpg";
import SfondoCarousel from "../../assets/graffiti/img/sfondocarousel.jpg";
import SfondoTagSect from "../../assets/graffiti/img/sfondosection.jpg";
import SfondoTagSectUp from "../../assets/graffiti/img/sfondograffsect.jpg";
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
      const richiesta = new Request("http://localhost:3001/api/tag/random", {
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
      const richiesta = new Request("http://localhost:3001/api/tag", {
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
    <div className="tag-body">
      <>
        <div
          className="headerTag text-center"
          style={{
            backgroundImage: `url(${BackImg})`,
          }}
        >
          <h1>
            The right destination <br /> for your tags
          </h1>
          <h3 className="mt-5">Upload a photo or get inspired</h3>
          <div
            style={{
              gap: "9rem",
            }}
            className="d-flex justify-content-center mt-5"
          >
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
          <video autoPlay muted loop playsInline className="background-video">
            <source src={videoTag} type="video/mp4" />
            Il tuo browser non supporta il formato video.
          </video>
        </div>

        <div
          className="containerCarousel-tag"
          style={{
            backgroundImage: `url(${SfondoCarousel})`,
          }}
        >
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
            className="mySwiper pb-3 pt-3"
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

        <div
          className="sfondo-tag-sect-up"
          style={{
            backgroundImage: `url(${SfondoTagSectUp})`,
          }}
        ></div>

        <Container
          ref={containerRef}
          className="containerBodyTag p-4 text-center"
        >
          <img src={TagSection} alt="tag section" className="tagSection" />

          <div className="masonry-grid-tag">
            {loadedImages.slice(0, visibleCount).map((image, index) => (
              <div
                key={index}
                className="masonry-item-tag"
                onClick={() => handleImageClick(image)}
              >
                <img
                  className="masonry-img"
                  src={image.immagineUrl}
                  alt={image.artista || `Immagine ${index + 1}`}
                />
                <div className="masonry-info-tag">
                  <span>{image.artista || "Artista Sconosciuto"}</span>
                </div>
              </div>
            ))}
          </div>

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

        <Modal
          className="modal-tag"
          show={showModal}
          onHide={handleClose}
          centered
        >
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
                  <div className="opera-modal-tag mt-2">
                    <p>Stato:</p>
                    <span>{selectedStatoOpera}</span>
                  </div>
                  <div className="opera-modal-tag mt-2">
                    <p>Anno:</p>
                    <span>{selectedAnno}</span>
                  </div>
                  <div className="opera-modal-tag mt-2">
                    <p>Luogo:</p>
                    <span>{selectedLuogo}</span>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "black",
              border: "none",
            }}
          >
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
    </div>
  );
};

export default Tag;
