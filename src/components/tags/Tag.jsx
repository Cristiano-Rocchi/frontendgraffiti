import "../streetart/Streetart.css";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StreetArtMonth from "../../assets/tag/img/tagmonth.png";
import StreetArtSection from "../../assets/tag/img/tagsect.png";
import { Container, Modal } from "react-bootstrap";
import CloseIcon from "../../assets/icons/delete.png";
import ArrowDown from "../../assets/icons/graffitiarrowred.png";
import videoStreetArt from "../../assets/tag/video/videotag.mp4";
import BackImg from "../../assets/tag/img/backimg.jpg";
import SfondoCarousel from "../../assets/graffiti/img/sfondocarousel.jpg";
import SfondoGraffSect from "../../assets/graffiti/img/sfondosection.jpg";
import SfondoGraffSectUp from "../../assets/tag/img/sectup.jpg";
import Track1 from "../../assets/music/The Notorious B.I.G. - Everyday Struggle (Official Audio) (152kbit_Opus).opus";
import Track2 from "../../assets/music/The Notorious B.I.G. - Friend of Mine (Official Audio) (128kbit_AAC).m4a";
import Track3 from "../../assets/music/The Notorious B.I.G. - Gimme the Loot (Official Audio) (128kbit_AAC).m4a";
import { Link } from "react-router-dom";

// Icon imports
import PlayIcon from "../../assets/icons/play.png";
import PauseIcon from "../../assets/icons/stop.png";
import NextIcon from "../../assets/icons/next.png";
import PrevIcon from "../../assets/icons/backward.png";
import CloseOverlayIcon from "../../assets/icons/delete.png";

const Streetart = () => {
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

  const tracks = [Track1, Track2, Track3];
  const trackNames = [
    "The Notorious B.I.G. - Everyday Struggle",
    "The Notorious B.I.G. - Friend of Mine",
    "The Notorious B.I.G. - Gimme the Loot",
  ];
  const audioRef = useRef(new Audio(tracks[currentTrackIndex]));

  const containerRef = useRef(null);
  const currentYear = new Date().getFullYear();

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

  useEffect(() => {
    audioRef.current.src = tracks[currentTrackIndex];

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

  const filteredImages = loadedImages.filter((image) => {
    const matchArtist = image.artista
      ?.toLowerCase()
      .includes(searchArtist.toLowerCase());
    const matchYear =
      !searchYear || image.annoCreazione === parseInt(searchYear, 10);
    return matchArtist && matchYear;
  });

  return (
    <div className="streetart-body">
      <>
        <div
          className="headerStreetArt text-center"
          style={{
            backgroundImage: `url(${BackImg})`,
          }}
        >
          <h1 className="h1-streetart">TAG YOUR LIFE</h1>
          <h3 className="mt-5">Upload a photo or get inspired</h3>
          <div className="d-flex justify-content-center mt-5 streetart-buttons">
            <button className="rounded-pill px-4 py-2 btn-style-streetart">
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
              className="rounded-pill px-4 py-2 btn-style-streetart"
              onClick={handleGetInspiredClick}
            >
              <span>GET INSPIRED</span>
            </button>
          </div>
        </div>

        <div className="video-container-streetart">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="background-video-streetart"
          >
            <source src={videoStreetArt} type="video/mp4" />
            Il tuo browser non supporta il formato video.
          </video>
        </div>

        <div
          className="containerCarousel-streetart"
          style={{
            backgroundImage: `url(${SfondoCarousel})`,
          }}
        >
          <img
            src={StreetArtMonth}
            alt="street art of the month"
            className="streetArtMonth"
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
            className="mySwiper-streetart pb-3 pt-3"
          >
            {randomImages.slice(0, 12).map((image, index) => (
              <SwiperSlide key={index}>
                <div className="image-container-streetart">
                  <img
                    className="imgCarousel-streetart"
                    src={image.immagineUrl}
                    alt={image.artista || `Immagine ${index + 1}`}
                    style={{
                      width: "250px",
                      height: "350px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                  />
                  <div className="artist-info-streetart rounded-pill">
                    <span>{image.artista || "Artista Sconosciuto"}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className="sfondo-streetart-sect-up"
          style={{
            backgroundImage: `url(${SfondoGraffSectUp})`,
          }}
        ></div>

        <Container
          ref={containerRef}
          className="containerBodyStreetArt text-center"
        >
          <div
            className="title-streetart"
            style={{
              backgroundImage: `url(${SfondoGraffSect})`,
            }}
          >
            <img src={StreetArtSection} alt="street art section" />
          </div>

          <div className="d-flex bg-black justify-content-between streetart-sect-text ">
            <h5 className="ms-4">
              Sfoglia tra <br /> le migliori opere
            </h5>
            <h5 className="me-4">
              Clicca sull'immagine <br /> e vedi tutti i dettagli
            </h5>
          </div>

          {/* Campi di ricerca */}
          <div className="search-container my-4 d-flex justify-content-center gap-4">
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
                  <h5 className="search-title">Ascolta la nostra playlist</h5>
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

          <div className="masonry-grid-streetart">
            {filteredImages.slice(0, visibleCount).map((image, index) => (
              <div
                key={index}
                className="masonry-item-streetart"
                onClick={() => handleImageClick(image)}
              >
                <img
                  className="masonry-img-streetart"
                  src={image.immagineUrl}
                  alt={image.artista || `Immagine ${index + 1}`}
                />
                <div className="masonry-info-streetart">
                  <span>{image.artista || "Artista Sconosciuto"}</span>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < loadedImages.length && (
            <div className="text-center">
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
        </Container>

        <Modal
          className="modal-streetart"
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
                  className="modal-image-streetart"
                />
                <div className="d-flex justify-content-between">
                  <div className="artist-info-modal-streetart mt-2 fs-3">
                    <span>{selectedArtist}</span>
                  </div>
                  <div className="opera-modal-streetart mt-2">
                    <p>Stato:</p>
                    <span>{selectedStatoOpera}</span>
                  </div>
                  <div className="opera-modal-streetart mt-2">
                    <p>Anno:</p>
                    <span>{selectedAnno}</span>
                  </div>
                  <div className="opera-modal-streetart mt-2">
                    <p>Luogo:</p>
                    <span>{selectedLuogo}</span>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "black", border: "none" }}>
            <img
              src={CloseIcon}
              alt="Close"
              onClick={handleClose}
              className="close-modal-icon-streetart"
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
          </Modal.Footer>
        </Modal>

        {showPlayerOverlay && (
          <div className="spotify-overlay-streetart">
            <span
              className="close-overlay-icon-streetart"
              onClick={closePlayerOverlay}
            >
              <img src={CloseOverlayIcon} alt="Chiudi" />
            </span>
            <p>
              <span style={{ color: "red" }}>
                Stai ascoltando: <br />
              </span>
              {trackNames[currentTrackIndex]}
            </p>
            <div className="player-controls-streetart">
              <span
                className="control-icon-streetart prev-icon-streetart"
                onClick={handlePrevTrack}
              >
                <img src={PrevIcon} alt="Previous" />
              </span>
              <span
                className="control-icon-streetart play-pause-icon-streetart"
                onClick={togglePlayPause}
              >
                <img src={isPlaying ? PauseIcon : PlayIcon} alt="Play/Pause" />
              </span>
              <span
                className="control-icon-streetart next-icon-streetart"
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

export default Streetart;
