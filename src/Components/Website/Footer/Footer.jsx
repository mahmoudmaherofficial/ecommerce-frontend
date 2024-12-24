import { Container } from 'react-bootstrap';
import './Footer.css';

export default function Footer() {
  return (
    <div id="footer">
      <Container>
        <p className="m-0 fw-bold"> E-Commerce &copy; All Rights Reserved</p>
        <p className="m-0 fs-6 text-white-50"> Developed By &lt; CODE404 /&gt; </p>
      </Container>
    </div>
  );
}
