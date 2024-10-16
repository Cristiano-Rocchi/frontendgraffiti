import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../profile/Profile.css";
import HelloImg from "../../assets/profile/img/Hello.jpg";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    const leftElement = document.querySelector(".profile-left-sect");
    const rightElement = document.querySelector(".profile-right-sect");

    leftElement.classList.add("profile-slide-in-left");
    rightElement.classList.add("profile-slide-in-right");
  }, []);

  return (
    <>
      <div className="username-div text-center pt-5 pb-5 position-relative">
        <div className="username-text">NOME UTENTE</div>
        <img className="img-hello" src={HelloImg} alt="Hello My Name Is" />
      </div>
      <Container>
        <Row>
          <Col xs="6" className="profile-left-sect">
            <h3>
              CIAO NOME UTENTE <br /> QUI PUOI GESTIRE IL TUO PROFILO, TENERE
              TRACCIA DELLE IMMAGINI CARICATE, MODIFICARLE O RIMUOVERLE SE VUOI
            </h3>
          </Col>
          <Col xs="6" className="profile-right-sect text-center">
            <button
              className="btn btn-primary mb-3"
              onClick={() => navigate("/profile")}
            >
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
      </Container>
    </>
  );
}

export default Profile;
