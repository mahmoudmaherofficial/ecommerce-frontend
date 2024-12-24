import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import Cookie from "cookie-universal";

import { baseUrl, LoginUrl } from "../../../Api/Api";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // Error Handling
  const [error, setError] = useState("");
  // Loading Screen Handling
  const [loading, setLoading] = useState(false);
  // Navigation Handling
  const navigator = useNavigate();
  // Cookies
  const cookie = Cookie();
  // Ref
  const input = useRef("");

  useEffect(() => {
    input.current.focus();
  }, []);

  const handleChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(LoginUrl, form)
      .then((res) => {
        cookie.set("token", res.data.token);
        const role = res.data.user.role;
        window.location.pathname =
          role === "1995" ? "/dashboard/users" : role === "1996" ? "/dashboard/moderator" : "/";
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="Login form">
        <div className="container d-flex justify-content-center">
          <div className="form-container">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="inputs">
                <Form.Label htmlFor="email" className="email">
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChanges}
                    ref={input}
                    required
                  />
                  <span>E-mail</span>
                </Form.Label>
                <Form.Label htmlFor="password" className="password">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChanges}
                    required
                    minLength={"8"}
                  />
                  <span>Password</span>
                </Form.Label>
              </div>
              <div className="btns">
                <button type="submit">Login</button>
                <span>
                  <p>or</p>
                </span>
                <button className="my-btn" onClick={() => navigator("/register")}>
                  Register
                </button>
              </div>
              <a className="swg-btn" href={`${baseUrl.replace("/api", "")}/login-google`}>
                <i className="fa-brands fa-google"></i>
                <p>Login with Google</p>
              </a>
            </Form>
          </div>
        </div>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    </>
  );
}
