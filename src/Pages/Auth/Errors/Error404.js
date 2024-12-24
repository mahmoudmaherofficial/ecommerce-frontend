import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Not Found</p>
      <p>Looks like you're lost, No Pages Found</p>
      <Link className="btn btn-outline-secondary" to={"/"}>
        Go to Home
      </Link>
    </div>
  );
}
