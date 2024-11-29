import "../graffiti/Graffiti.css";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import GraffMonth from "../../assets/graffiti/img/graffiti_of_the_month.png";
import GraffSection from "../../assets/graffiti/img/graffitiSection.png";
import { Container, Modal } from "react-bootstrap";
import CloseIcon from "../../assets/icons/delete.png";
import ArrowDown from "../../assets/icons/graffitiarrowred.png";
import videoGraff from "../../assets/graffiti/vid/videowebsite.mp4";
import BackImg from "../../assets/graffiti/img/backimg.jpg";
import SfondoCarousel from "../../assets/graffiti/img/sfondocarousel.jpg";
import SfondoGraffSect from "../../assets/graffiti/img/sfondosection.jpg";
import SfondoGraffSectUp from "../../assets/graffiti/img/sectup.jpg";
import registrati_modal from "../../assets/modale_register/registrati.png";

import Track1 from "../../assets/music/The Notorious B.I.G. - Everyday Struggle (Official Audio) (152kbit_Opus).opus";
import Track2 from "../../assets/music/The Notorious B.I.G. - Friend of Mine (Official Audio) (128kbit_AAC).m4a";
import Track3 from "../../assets/music/The Notorious B.I.G. - Gimme the Loot (Official Audio) (128kbit_AAC).m4a";
import { Link } from "react-router-dom";
import BASE_URL from "../../config";

// Icon imports
import PlayIcon from "../../assets/icons/play.png";
import PauseIcon from "../../assets/icons/stop.png";
import NextIcon from "../../assets/icons/next.png";
import PrevIcon from "../../assets/icons/backward.png";
import CloseOverlayIcon from "../../assets/icons/delete.png";

const Graffiti = () => {
  const navigate = useNavigate();

  const [loadedImages, setLoadedImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStatoOpera, setSelectedStatoOpera] = useState("");
  const [selectedAnno, setSelectedAnno] = useState("");
  const [selectedLuogo, setSelectedLuogo] = useState("");

  const [searchArtist, setSearchArtist] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [showPlayerOverlay, setShowPlayerOverlay] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tracks = [Track1, Track2, Track3];
  const trackNames = [
    "The Notorious B.I.G. - Everyday Struggle ",
    "The Notorious B.I.G. - Friend of Mine",
    "The Notorious B.I.G. - Gimme the Loot",
  ];
  const audioRef = useRef(new Audio(tracks[currentTrackIndex]));

  const containerRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  //controllo se l'utente è loggato
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token || !storedUsername) {
      setShowRegisterModal(true); // Mostra il modal se l'utente non è loggato
    }
  }, []);

  useEffect(() => {
    const fetchRandomImages = async () => {
      const richiesta = new Request(`${BASE_URL}/api/graffiti`, {
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
          console.log("Immagini casuali (graffiti):", data); // Aggiungi questo log
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
      const richiesta = new Request(`${BASE_URL}/api/graffiti`, {
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

  useEffect(() => {
    // Cambia la sorgente dell'audio con la traccia attuale
    audioRef.current.src = tracks[currentTrackIndex];

    // Se la riproduzione è attiva, riproduci la nuova traccia
    if (isPlaying) {
      audioRef.current.play();
    }

    audioRef.current.addEventListener("ended", handleTrackEnd);
    return () => {
      audioRef.current.removeEventListener("ended", handleTrackEnd);
    };
  }, [currentTrackIndex, isPlaying]);

  const handleTrackEnd = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowPlayerOverlay(true);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
    );
    setIsPlaying(true);
  };

  const closePlayerOverlay = () => {
    setShowPlayerOverlay(false);
    setIsPlaying(false);
  };

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
  const handleCloseModal = () => {
    setShowRegisterModal(false); // Chiudi il modal
    navigate("/"); // Reindirizza alla home
  };

  const filteredImages = loadedImages.filter((image) => {
    const matchArtist = image.artista
      ?.toLowerCase()
      .includes(searchArtist.toLowerCase());
    const matchYear =
      !searchYear || image.annoCreazione === parseInt(searchYear, 10);
    return matchArtist && matchYear;
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="graffiti-body">
      <>
        <div
          className="headerGraffiti text-center"
          style={{
            backgroundImage: `url(${BackImg})`,
          }}
        >
          <h1 className="h1-graff">
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

        <div
          className="containerCarousel"
          style={{
            backgroundImage: `url(${SfondoCarousel})`,
          }}
        >
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
            breakpoints={{
              0: {
                slidesPerView: 1, // Mostra 1 immagine per schermi < 480px
              },
              480: {
                slidesPerView: 2, // Mostra 2 immagini per schermi >= 480px e < 768px
              },
              768: {
                slidesPerView: 3, // Mostra 3 immagini per schermi >= 768px e < 992px
              },
              910: {
                slidesPerView: 4, // Mostra 4 immagini per schermi >= 992px e < 1165px
              },
              1165: {
                slidesPerView: 5, // Mostra 5 immagini per schermi >= 1165px e < 2000px
              },
              1500: {
                slidesPerView: 6, // Mostra 6 immagini per schermi >= 2000px
              },
            }}
          >
            {randomImages.slice(0, 12).map((image, index) => (
              <SwiperSlide key={index}>
                <div className="image-container">
                  <img
                    className="imgCarousel"
                    src={image.immagineUrl}
                    alt={image.artista || `Immagine ${index + 1}`}
                  />
                  <div className="artist-info rounded-pill">
                    <span>{image.artista || "Artista Sconosciuto"}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className="sfondo-graff-sect-up"
          style={{
            backgroundImage: `url(${SfondoGraffSectUp})`,
          }}
        ></div>

        <div className="graff-sect-body">
          <Container
            ref={containerRef}
            className="containerBodyGraffiti text-center"
          >
            <div
              className="title-graffiti"
              style={{
                backgroundImage: `url(${SfondoGraffSect})`,
              }}
            >
              <img src={GraffSection} alt="" />
            </div>

            <div className="d-flex bg-black justify-content-between graff-sect-text ">
              <h5 className="ms-4">
                Sfoglia tra <br /> le migliori opere
              </h5>
              <h5 className="me-4">
                Clicca sull'immagine <br /> e vedi tutti i dettagli
              </h5>
            </div>

            {/* Campi di ricerca */}
            <div className="search-container my-4">
              {/* Card visibile su schermi piccoli */}
              <div className="search-card d-block d-md-none p-3">
                <h5 className="search-title">Totale opere</h5>
                <p
                  className="total-opere"
                  style={{ color: "red", fontFamily: "Typewriter" }}
                >
                  {loadedImages.length}
                </p>
              </div>

              {/* Card orizzontali per schermi sopra i 600px */}
              <div className="search-cards d-none d-md-flex justify-content-center gap-4">
                <div className="search-card flip-card search-card-expand p-3">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h5 className="search-title">Puoi cercare per nome</h5>
                    </div>
                    <div className="flip-card-back">
                      <input
                        type="text"
                        placeholder="Cerca artista"
                        value={searchArtist}
                        onChange={(e) => setSearchArtist(e.target.value)}
                        className="form-small"
                      />
                    </div>
                  </div>
                </div>

                <div className="search-card flip-card p-3">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h5 className="search-title">Totale opere</h5>
                    </div>
                    <div className="flip-card-back">
                      <p
                        className="total-opere"
                        style={{ color: "red", fontFamily: "Typewriter" }}
                      >
                        {loadedImages.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="search-card flip-card search-card-expand p-3">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h5 className="search-title">Puoi cercare per data</h5>
                    </div>
                    <div className="flip-card-back">
                      <input
                        type="number"
                        placeholder="Cerca per anno"
                        value={searchYear}
                        onChange={(e) => setSearchYear(e.target.value)}
                        className="form-small"
                        min="1975"
                        max={currentYear}
                      />
                    </div>
                  </div>
                </div>

                <div className="search-card flip-card p-3">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h5 className="search-title">
                        Ascolta la nostra playlist
                      </h5>
                    </div>
                    <div className="flip-card-back" onClick={togglePlayPause}>
                      <span
                        style={{
                          color: "red",
                          fontFamily: "Typewriter",
                          fontSize: "1.5rem",
                        }}
                      >
                        {isPlaying ? "Pausa ◼" : "Play ▶"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="graffiti-section">
              {/* Griglia visibile solo su schermi grandi */}
              <div className="masonry-grid d-none d-md-block">
                {filteredImages.slice(0, visibleCount).map((image, index) => (
                  <div
                    key={index}
                    className="masonry-item"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      className="masonry-img"
                      src={image.immagineUrl}
                      alt={image.artista || `Immagine ${index + 1}`}
                    />
                    <div className="masonry-info">
                      <span>{image.artista || "Artista Sconosciuto"}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel visibile solo su schermi piccoli */}
              <div className="d-block d-md-none">
                <Swiper
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="mobile-carousel"
                  modules={[Navigation]}
                >
                  {filteredImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="image-container">
                        <img
                          className="carousel-img"
                          src={image.immagineUrl}
                          alt={image.artista || `Immagine ${index + 1}`}
                        />
                        <div className="artist-info rounded-pill">
                          <span>{image.artista || "Artista Sconosciuto"}</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Bottone "Mostra di più" visibile solo con la griglia */}
              {visibleCount < loadedImages.length && (
                <div className="text-center d-none d-md-block">
                  <div onClick={loadMoreImages} className="load-more-container">
                    <span className="line"></span>
                    <span className="load-more-text">Mostra di più</span>
                    <img
                      src={ArrowDown}
                      className="arrow-svg"
                      alt="Carica altre immagini"
                    />
                    <span className="line"></span>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>

        <Modal
          className="modal-graffiti"
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
                  className="modal-image"
                />
                <div className="d-flex justify-content-between">
                  <div className="artist-info-modal mt-2 fs-3">
                    <span>{selectedArtist}</span>
                  </div>
                  <div className="opera-modal mt-2">
                    <p>Stato:</p>
                    <span> {selectedStatoOpera}</span>
                  </div>
                  <div className="opera-modal mt-2">
                    <p>Anno:</p>
                    <span> {selectedAnno}</span>
                  </div>
                  <div className="opera-modal mt-2">
                    <p>Luogo:</p>
                    <span>
                      {selectedLuogo.charAt(0).toUpperCase() +
                        selectedLuogo.slice(1).toLowerCase()}
                    </span>
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

        {/* Modal per chiedere la registrazione */}
        <Modal
          className="modal-register-page"
          show={showRegisterModal}
          onHide={() => setShowRegisterModal(false)}
          centered
          backdrop="static"
        >
          <Modal.Body className="text-center">
            <img
              src={registrati_modal}
              alt="per favore registrati"
              style={{
                height: "100px",
              }}
            />
            <p className="modal-register-text">
              Gratis e in completo anonimato{" "}
            </p>
            <p className="info-register">
              <i className="bi bi-info-circle fs-6 me-2"></i>
              Non chiediamo dati sensibili
            </p>
            <p className="info-register">
              <i className="bi bi-info-circle fs-6 me-2"></i>
              ti basta una email anche fittizia
            </p>

            <Link to="/register">
              <button className="btn btn-primary mt-3">Registrati</button>
            </Link>
          </Modal.Body>
          <Modal.Footer>
            <img
              src={CloseIcon}
              alt="Chiudi"
              onClick={handleCloseModal}
              className="close-modal-icon"
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
          </Modal.Footer>
        </Modal>

        {showPlayerOverlay && (
          <div className="music-overlay">
            <span className="close-overlay-icon" onClick={closePlayerOverlay}>
              <img src={CloseOverlayIcon} alt="Chiudi" />
            </span>
            <p>
              <span
                style={{
                  color: "red",
                }}
              >
                Stai ascoltando: <br />
              </span>{" "}
              {trackNames[currentTrackIndex]}
            </p>
            <div className="player-controls">
              <span
                className="control-icon prev-icon"
                onClick={handlePrevTrack}
              >
                <img src={PrevIcon} alt="Previous" />
              </span>
              <span
                className="control-icon play-pause-icon"
                onClick={togglePlayPause}
              >
                <img src={isPlaying ? PauseIcon : PlayIcon} alt="Play/Pause" />
              </span>
              <span
                className="control-icon next-icon"
                onClick={handleNextTrack}
              >
                <img src={NextIcon} alt="Next" />
              </span>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Graffiti;
