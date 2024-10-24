import { Col, Container, Row } from "react-bootstrap";
import ImgGraffiti from "../../assets/home/img/Tgraffitihome2.jpg";
import ImgStreetAtrt from "../../assets/home/img/StreetartHome.jpg";
import imgTag from "../../assets/home/img/TagHome.jpg";
import { Link } from "react-router-dom";
import "../home/Home.css";
function Home() {
  return (
    <div className="homeBody">
      <Container>
        <Row className="">
          <Col>
            {" "}
            <div className="drop text-center">
              <Link className="nav-link " to={"/graffiti"}>
                <img src={ImgGraffiti} alt="" className="imgHome" />
              </Link>
              <Link to={"/graffiti"}>
                <div className="cardBody">
                  <div className="containerCard">
                    <div className="cardHome card cardGraffiti"></div>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="drop text-center">
              <Link className="nav-link " to={"/streetart"}>
                <img src={ImgStreetAtrt} alt="" className="imgHome" />
              </Link>
              <Link to={"/streetart"}>
                <div className="cardBody">
                  <div className="containerCard">
                    <div className="cardHome card cardStreetart"></div>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="drop text-center">
              <Link className="nav-link " to={"/tag"}>
                <img src={imgTag} alt="" className="imgHome" />
              </Link>
              <Link to={"/tag"}>
                <div className="cardBody">
                  <div className="containerCard">
                    <div className="cardHome card cardTag"></div>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
