import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { CategoryUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddCategory() {
  // User
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const form = new FormData();
  form.append("title", title);
  form.append("image", image);

  // Navigation
  const navigator = useNavigate();

  // Handle Loading Screen
  const [loading, setLoading] = useState(false);

  // Ref
  const input = useRef("");

  useEffect(() => {
    input.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Axios.post(`${CategoryUrl}/add`, form)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Category added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigator("/dashboard/categories", { replace: true });
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
          <h1 className="title">Add Category</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                ref={input}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <button className="btn" type="submit" disabled={title ? false : true}>
              Create
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
