import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <>
      <Container>
        <Row className="">
          <Col>
            {" "}
            <div className="drop">
              <img
                className="rounded-circle w-50 h-50"
                src="https://www.throwup.it/wp-content-throwup/uploads/2021/04/micro-00-graffiti-artist-throwup-magazine.jpg"
                alt="graff"
              />
              <h4 className="ms-5">GRAFFITI</h4>
            </div>
          </Col>
          <Col>
            <div className="drop">
              <img
                className="rounded-circle w-50 h-50"
                src="https://www.throwup.it/wp-content-throwup/uploads/2021/04/micro-00-graffiti-artist-throwup-magazine.jpg"
                alt="graff"
              />
              <h4 className="ms-5">STREET-ART</h4>
            </div>
          </Col>
          <Col>
            <div className="drop">
              <img
                className="rounded-circle h-50 w-50"
                src="https://www.throwup.it/wp-content-throwup/uploads/2021/04/micro-00-graffiti-artist-throwup-magazine.jpg"
                alt="graff"
              />
              <h4 className="ms-5">TAGS</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
