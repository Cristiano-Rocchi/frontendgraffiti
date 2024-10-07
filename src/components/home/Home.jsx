import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div className="bg-dark">
      <Container>
        <Row className="">
          <Col>
            {" "}
            <div className="drop text-center">
              <img
                className="rounded-circle w-50 h-50"
                src="https://www.throwup.it/wp-content-throwup/uploads/2021/04/micro-00-graffiti-artist-throwup-magazine.jpg"
                alt="graff"
              />
              <h4>GRAFFITI</h4>
            </div>
          </Col>
          <Col>
            <div className="drop text-center">
              <img
                className="rounded-circle w-50 h-50"
                src="https://www.throwup.it/wp-content-throwup/uploads/2021/04/micro-00-graffiti-artist-throwup-magazine.jpg"
                alt="graff"
              />
              <h4>STREET-ART</h4>
            </div>
          </Col>
          <Col>
            <div className="drop text-center">
              <img
                className="rounded-circle h-50 w-50"
                src="https://storage.googleapis.com/pod_public/1300/167870.jpg"
                alt="graff"
              />
              <h4>TAGS</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
