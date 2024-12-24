import { Link } from "react-router-dom";

export default function Error403({role}) {
  return (
    <div className="error-page">
      <h1>403</h1>
      <p>Forbidden</p>
      <p>You do not have permission to access this page.</p>
      <Link className="btn btn-outline-secondary" to={role === "1996" ? "/dashboard/moderator" : "/"}>{role === "1996" ? "Go to Moderator Dashboard" : "Go to Home"}</Link>
    </div>
  );
}
