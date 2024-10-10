import "../graffiti/Graffiti.css";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import GraffMonth from "../../assets/graffiti/img/graffiti_of_the_month.png";
import { Container, Row, Col, Button } from "react-bootstrap";

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

  useEffect(() => {
    setLoadedImages(images.slice(0, visibleCount));
  }, [visibleCount]);

  const loadMoreImages = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  return (
    <>
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

      <Container className="containerBody">
        <Row>
          {loadedImages.map((image, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="card-container">
                <img
                  className="card-img"
                  src={image}
                  alt={`Immagine ${index + 1}`}
                />
                <div className="card-info">
                  <span>Immagine {index + 1}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {visibleCount < images.length && (
          <div className="text-center">
            <Button onClick={loadMoreImages} className="load-more-btn">
              Carica altre immagini
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Graffiti;
