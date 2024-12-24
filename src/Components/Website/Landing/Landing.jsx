import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Landing.css';
export default function Landing() {
  return (
    <div id="landing">
      <Container fluid>
        <div className="content">
          <h1 className="title">Get Discount up to 50%</h1>
          <p className="subtitle">
            Welcome to our online store, where we offer a wide range of products for all your needs. Our team of experts
            is always on hand to help you find the perfect item for any occasion.
          </p>
          <Link to="/" className="shop-now">
            <Button className="shop-now-btn btn btn-lg rounded-pill">Shop Now</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
