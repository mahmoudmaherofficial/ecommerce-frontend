import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { UserUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUser() {
  // User
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  // Navigation
  const navigator = useNavigate();

  // Handle Loading Screen
  const [loading, setLoading] = useState(false);

  // Ref
  const input = useRef("");

  useEffect(() => {
    input.current.focus();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Axios.post(`${UserUrl}/add`, {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      role: role.trim(),
    })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigator("/dashboard/users", { replace: true });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <LoadingScreen />}
      <div className="user-update container">
        <div className="user-form" style={{ marginTop: "60px" }}>
          <h1 className="title">Add User</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                ref={input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Role:</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Default select example">
                <optgroup label="Select role">
                  <option value={"1995"}>admin</option>
                  <option value={"1996"}>moderator</option>
                  <option value={"1999"}>product manager</option>
                  <option value={"2001"}>user</option>
                </optgroup>
              </Form.Select>
            </Form.Group>
            <button className="btn" type="submit" disabled={email && name && password ? false : true}>
              Create
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
