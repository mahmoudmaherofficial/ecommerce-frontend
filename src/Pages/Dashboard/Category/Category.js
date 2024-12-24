import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { CategoryUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Category() {
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

  // Id
  const { id: cId } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(`${CategoryUrl}/${cId}`);
        setTitle(data.title);
        setImage(data.image);
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

    Axios.post(`${CategoryUrl}/edit/${cId}`, form)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User saved successfully",
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
        <div className="user-form">
          <h1 className="title">Update Category</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
            <div className="my-3" style={{ textAlign: "center", width: "100px" }}>
              <img src={image} alt="" width={"100%"} />
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image:</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <button className="btn" type="submit" disabled={title ? false : true}>
              Update
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
