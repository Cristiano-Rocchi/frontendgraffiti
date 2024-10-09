import "../graffiti/Graffiti.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import GraffMonth from "../../assets/graffiti/img/graffiti_of_the_month.png";

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
  ];

  return (
    <>
      <div></div>
      <div className="containerCarousel">
        <img
          src={GraffMonth}
          alt="graffiti of the month"
          className="graffMonth"
        />
        {/* <h4 className="mb-3">
          <span>a</span>GRAFFITI OF THE MONTH <span>a</span>
        </h4> */}

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
          modules={[Autoplay]} //inserire qua il pagination e importarlo sopras
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                <img
                  src={image}
                  alt={`Immagine ${index + 1}`}
                  style={{
                    width: "250px",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "30px",
                  }}
                />
                {/* Sezione per il nome artista */}
                <div className="artist-info rounded-pill">
                  <span>Artista {index + 1}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Graffiti;
