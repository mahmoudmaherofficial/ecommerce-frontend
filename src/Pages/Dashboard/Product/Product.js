import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { CategoriesUrl, productImgUrl, ProductUrl } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function UpdateProduct() {
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
  // Handle Current Product ID
  // const [currentProductId, setCurrentProductId] = useState(null);
  const { id: currentProductId } = useParams();
  console.log(currentProductId);

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imgsFromServer, setImgsFromServer] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const progress = useRef([]);

  // to disable form before selecting category
  // const [sent, setSent] = useState(false);

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
    setLoading(true);
    Axios.get(`${ProductUrl}/${currentProductId}`)
      .then((res) => {
        setForm(res.data[0]);
        setImgsFromServer(res.data[0].images);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    for (const id of deletedImages) {
      await Axios.delete(`${productImgUrl}/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

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
  };

  // // Handle creating dummy Obj
  // const handleDummyData = async () => {
  //   try {
  //     const res = await Axios.post(`${ProductUrl}/add`, dummyData);
  //     console.log(res);
  //     setCurrentProductId(res.data.id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Handle form changes
  const handleFormChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // setSent(true);
    // !sent && handleDummyData();
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
  const handleRemoveImageFromServer = async (id) => {
    setImgsFromServer((prev) => prev.filter((img) => img.id !== id));
    setDeletedImages((prev) => [...prev, id]);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="user-update container">
        <div className="user-form" style={{ marginTop: '0px', marginBottom: '30px' }}>
          <h1 className="title">Update Product</h1>
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
              <Form.Control type="text" name="title" value={form.title} onChange={handleFormChanges} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control type="text" name="description" value={form.description} onChange={handleFormChanges} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" name="price" value={form.price} onChange={handleFormChanges} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="discount">
              <Form.Label>Discount:</Form.Label>
              <Form.Control type="number" name="discount" value={form.discount} onChange={handleFormChanges} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="about">
              <Form.Label>About:</Form.Label>
              <Form.Control type="text" name="About" value={form.About} onChange={handleFormChanges} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="about">
              <Form.Label>Stock:</Form.Label>
              <Form.Control type="text" name="stock" value={form.stock} onChange={handleFormChanges} />
            </Form.Group>
            <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '10px' }}>
              <Form.Group className="mb-3" controlId="images" hidden>
                <Form.Label>Images:</Form.Label>
                <Form.Control ref={imgUpload} multiple type="file" onChange={handleImageUpload} />
              </Form.Group>
              <div
                className="d-flex justify-content-center align-items-center flex-column gap-2"
                style={{
                  cursor: 'pointer',
                  marginBottom: imgsFromServer.length > 0 ? '20px' : '0px',
                  borderRadius: '10px',
                  border: '3px dashed #ccc',
                  padding: '15px',
                }}
                onClick={() => imgUpload.current.click()}
              >
                <FontAwesomeIcon icon={faUpload} style={{ color: '#ff5721', fontSize: '3rem' }} />
                <p className="m-0 ms-2 fw-bold" style={{ color: '#ff5721', fontSize: '1.1rem' }}>
                  Upload Images
                </p>
              </div>
              <div className="d-flex gap-3" style={{ flexWrap: 'wrap' }}>
                {imgsFromServer.map((img, idx) => {
                  return (
                    <div className="d-flex flex-column bg-white p-2 rounded-3" key={idx}>
                      <div className="d-flex justify-content-between align-items-center position-relative">
                        <div className="d-flex gap-3 align-items-center">
                          <img src={img.image} alt={img.id} height={'80px'} className="rounded-3" />
                        </div>
                        <button
                          className="btn position-absolute d-flex justify-content-center align-items-center"
                          type="button"
                          style={{
                            width: '20px',
                            height: '20px',
                            padding: '0px',
                            margin: '0px',
                            left: '100%',
                            top: '0',
                            transform: 'translateX(-100%)',
                          }}
                        >
                          <FontAwesomeIcon icon={faXmark} onClick={() => handleRemoveImageFromServer(img.id)} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={`d-flex flex-column gap-3 ${images.length > 0 && 'mt-3'}`}>
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
              Update
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
