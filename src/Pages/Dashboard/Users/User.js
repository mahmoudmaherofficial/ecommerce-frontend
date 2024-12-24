import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { UserUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function User() {
  // User
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Navigation
  const navigator = useNavigate();

  // Handle Loading Screen
  const [loading, setLoading] = useState(false);

  // Id
  const { id: uId } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(`${UserUrl}/${uId}`);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      } catch (err) {
        console.log(err);
        navigator("/dashboard/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = { name, email, role };
    Axios.post(`${UserUrl}/edit/${uId}`, userData)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User saved successfully",
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
        <div className="user-form">
          <h1 className="title">Update User</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
            <button className="btn" type="submit" disabled={email && name ? false : true}>
              Update
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
