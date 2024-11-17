import { Col, Container, Row } from "react-bootstrap";
import ImgGraffiti from "../../assets/home/img/Graffiti_home.png";
import ImgStreetAtrt from "../../assets/home/img/Streetart_home.png";
import imgTag from "../../assets/home/img/Tag_home.png";
import { Link } from "react-router-dom";
import "../home/Home.css";
function Home() {
  return (
    <div className="homeBody">
      <Container>
        {/* Layout originale */}
        <Row className="">
          <Col>
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

        {/* Layout per schermi piccoli */}

        <div className="small-layout">
          <Link to="/graffiti" className="cardLink">
            <div className="fullCard  graffitiCard">
              <h2 className="cardText">Graffiti</h2>
            </div>
          </Link>
          <Link to="/streetart" className="cardLink">
            <div className="fullCard  streetartCard">
              <h2 className="cardText">Streetart</h2>
            </div>
          </Link>
          <Link to="/tag" className="cardLink">
            <div className="fullCard  tagCard">
              <h2 className="cardText">Tag</h2>
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;
