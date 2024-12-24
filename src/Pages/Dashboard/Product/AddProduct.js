import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { CategoriesUrl, productImgUrl, ProductUrl } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function AddProduct() {
  // Product
  const [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: '',
    stock: '',
  });
  const dummyData = {
    category: null,
    title: 'dummy',
    description: 'dummy',
    price: 222,
    discount: 0,
    About: 'dummy',
    stock: 0,
  };
  // Handle Current Product ID
  const [currentProductId, setCurrentProductId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const progress = useRef([]);

  // to disable form before selecting category
  const [sent, setSent] = useState(false);

  // Navigation
  const navigator = useNavigate();

  // Handle Loading Screen
  const [loading, setLoading] = useState(false);

  // Refs
  const input = useRef('');
  const imgUpload = useRef('');
  const imageChange = useRef(-1);
  const ids = useRef([]);

  useEffect(() => {
    input.current.focus();
  }, []);

  useEffect(() => {
    setLoading(true);
    Axios.get(CategoriesUrl)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (images.length > 0) {
      Axios.post(`${ProductUrl}/edit/${currentProductId}`, form)
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          navigator('/dashboard/products', { replace: true });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'You must add product images',
        showConfirmButton: false,
        timer: 1000,
      });
      setLoading(false);
    }
  };

  // Handle creating dummy Obj
  const handleDummyData = async () => {
    try {
      const res = await Axios.post(`${ProductUrl}/add`, dummyData);
      console.log(res);
      setCurrentProductId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle form changes
  const handleFormChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    !sent && handleDummyData();
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    setImages((prev) => [...prev, ...e.target.files]);
    const imageFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      imageChange.current++;
      data.append('image', imageFiles[i]);
      data.append('product_id', currentProductId);
      try {
        const res = await Axios.post(`${productImgUrl}/add`, data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            // if (percent % 10 == 0) {
            progress.current[imageChange.current].style.width = `${percent}%`;
            progress.current[imageChange.current].setAttribute('percent', `${percent}%`);
            // }
          },
        });
        ids.current[imageChange.current] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRemoveImage = async (id, img) => {
    // setImages((prev) => prev.filter((_, i) => i !== index));
    const pId = ids.current[id];
    try {
      await Axios.delete(`${productImgUrl}/${pId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((id) => id !== pId);
      imageChange.current--;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="user-update container">
        <div className="user-form" style={{ marginTop: '0px', marginBottom: '30px' }}>
          <h1 className="title">Add Product</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category:</Form.Label>
              <Form.Select name="category" value={form.category} onChange={handleFormChanges} ref={input}>
                <option disabled>Select Category</option>
                {categories.length > 0 ? (
                  categories.map(({ id, title }) => (
                    <option key={id} value={id}>
                      {title}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories found</option>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" name="title" value={form.title} onChange={handleFormChanges} disabled={!sent} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={form.description}
                onChange={handleFormChanges}
                disabled={!sent}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleFormChanges}
                disabled={!sent}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="discount">
              <Form.Label>Discount:</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleFormChanges}
                disabled={!sent}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="about">
              <Form.Label>About:</Form.Label>
              <Form.Control type="text" name="About" value={form.About} onChange={handleFormChanges} disabled={!sent} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleFormChanges}
                disabled={!sent}
              />
            </Form.Group>
            <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '10px' }}>
              <Form.Group className="mb-3" controlId="images" hidden>
                <Form.Label>Images:</Form.Label>
                <Form.Control ref={imgUpload} multiple type="file" onChange={handleImageUpload} />
              </Form.Group>
              <div
                className="d-flex justify-content-center align-items-center flex-column gap-2"
                style={{
                  cursor: !sent ? 'no-drop' : 'pointer',
                  marginBottom: images.length > 0 ? '20px' : '0px',
                  borderRadius: '10px',
                  border: '3px dashed #ccc',
                  padding: '15px',
                }}
                onClick={() => sent && imgUpload.current.click()}
              >
                <FontAwesomeIcon icon={faUpload} style={{ color: !sent ? '#ccc' : '#ff5721', fontSize: '3rem' }} />
                <p className="m-0 ms-2 fw-bold" style={{ color: !sent ? '#ccc' : '#ff5721', fontSize: '1.1rem' }}>
                  Upload Images
                </p>
              </div>
              <div className="d-flex flex-column gap-3">
                {images.map((img, idx) => {
                  const imgSize = img.size / 1024;
                  return (
                    <div className="d-flex flex-column bg-white p-2 rounded-3" key={idx}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                          <img src={URL.createObjectURL(img)} alt={img.name} width={'80px'} className="rounded-3" />
                          <div className="d-flex flex-column gap-1">
                            <p className="m-0">{img.name}</p>
                            <p className="m-0 text-secondary fw-bold" style={{ fontSize: '13px' }}>
                              {imgSize < 900
                                ? `${imgSize.toFixed(2)} KB`
                                : `${(img.size / (1024 * 1024)).toFixed(2)} MB`}
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn"
                          type="button"
                          style={{ width: '30px', height: '30px', padding: '0px', margin: '0px' }}
                        >
                          <FontAwesomeIcon icon={faXmark} onClick={() => handleRemoveImage(idx, img)} />
                        </button>
                      </div>
                      <div className="custom-progress mt-2 rounded">
                        <span
                          key={idx}
                          ref={(e) => (progress.current[idx] = e)}
                          style={{ width: '0%' }}
                          percent={'0%'}
                          className="progress-bar rounded"
                        ></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="btn" type="submit" disabled={form.title ? false : true}>
              Create
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
