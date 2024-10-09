import "../graffiti/Graffiti.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
    <div className="containerCarousel">
      <Swiper
        slidesPerView={7}
        spaceBetween={100}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={2000}
        /* pagination={{
          clickable: true,
        }}*/
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
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h6>Persona {index + 1}</h6>
              <small>Ruolo designer</small>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Graffiti;
