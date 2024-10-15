import { Container } from "react-bootstrap";
import "../components/prova.css";

function Prova() {
  return (
    <Container className="con">
      <div className="cube">
        <div className="top"></div>
        <div>
          <span style={{ "--i": 0 }}></span>
          <span style={{ "--i": 0 }}></span>
          <span style={{ "--i": 0 }}></span>
          <span style={{ "--i": 0 }}></span>
        </div>
      </div>
    </Container>
  );
}
export default Prova;
