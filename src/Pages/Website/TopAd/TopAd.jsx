import { Button, Container } from "react-bootstrap";
import './TopAd.css'

export default function TopAd() {
  return (
    <section id="top-ad" className="my-5 shadow">
      <Container className="d-flex justify-content-between align-items-center flex-lg-row flex-column">
        <div className="text-content h1 d-flex flex-column justify-content-center align-items-start gap-3">
          <div className="m-0">Razer Gaming Mouse <span className="badge bg-warning" >New</span></div>
          <Button>Get Now</Button>
        </div>
        <div className="img-container">
          <img src={require('../../../Assets/mouse.jpg')} alt="" className="img-fluid" />
        </div>
      </Container>
    </section>
  );
}
