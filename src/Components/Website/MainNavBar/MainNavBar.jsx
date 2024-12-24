import { Button, Container, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Axios } from '../../../Api/axios';
import { CategoriesUrl } from '../../../Api/Api';
import './MainNavBar.css';
import SliceText from '../../../Services/SliceText';
import SkeletonLoading from '../SkeletonLoading/SkeletonLoading';
import { CartReloading } from '../../../Context/CartReloadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlusAndMinusBtn from '../PlusAndMinusBtn/PlusAndMinusBtn';
import Swal from 'sweetalert2';

export default function MainNavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [count, setCount] = useState(false);
  const { isChange, setIsChange } = useContext(CartReloading);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${CategoriesUrl}`)
      .then((res) => setCategories(res.data.slice(-10)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem('products')) || [];
    setCartProducts(getProducts.length > 0 ? getProducts : []);
  }, [isChange]);

  const handleRemoveFromCart = (id) => {
    const updatedProducts = cartProducts.filter((product) => +product.id !== +id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setCartProducts(updatedProducts);
    setIsChange((prev) => !prev);
  };

  const changeCartCount = async (product, changeAmount) => {
    if (changeAmount > 0) {
      const currentProducts = JSON.parse(localStorage.getItem('products')) || [];
      currentProducts.map((item) =>
        item.id === product.id ? (item.count = changeAmount > product.stock ? item.count : changeAmount) : item
      );
      localStorage.setItem('products', JSON.stringify(currentProducts));
      setIsChange((prev) => !prev);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `You can't decrease anymore`,
        showConfirmButton: false,
        timer: 800,
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            {cartProducts.length > 0 ? (
              cartProducts.map((product, idx) => {
                return (
                  <div className="cart-product border rounded" key={idx}>
                    <div className="image">
                      <img src={product.images[0].image} alt="" className="" />
                    </div>
                    <div className="product-details">
                      <div className="title">{product.title}</div>
                      <div className="desc text-muted">{product.description}</div>
                      <div className="price">
                        {product.discount ? +product.price - +product.discount : +product.price} EGP
                        <span className="discount text-muted text-decoration-line-through ms-1">
                          {product.discount && +product.price} EGP
                        </span>
                      </div>
                    </div>
                    <div className="controls">
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="delete-prd bg-danger text-white rounded-circle"
                        onClick={() => handleRemoveFromCart(product.id)}
                      />
                      {/* <div className="count text-muted">{product.count}</div> */}
                      <PlusAndMinusBtn
                        product={product}
                        width={'100'}
                        btnCount={product.count || 1}
                        setBtnCount={setCount}
                        changeCartCount={changeCartCount}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="fs-5 text-center">No Items Found</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="checkout" variant="primary" onClick={handleClose}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
      <div id="main-nav" className="p-2">
        <Container>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="col-md-3 col-6 d-flex justify-content-start align-items-center">
              <div id="logo">
                <Link to={'/'} className="text-decoration-none">
                  <img src={require('../../../Assets/logo.png')} alt="Logo" width={'200px'} />
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-12 order-md-0 order-3 d-flex justify-content-center align-items-center">
              <div id="search" className="mt-md-0 mt-3">
                <Form.Control type="search" placeholder="Search Product" id="search-field" className="rounded-pill" />
                <button id="search-btn" className="btn rounded-pill">
                  Search
                </button>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex justify-content-end align-items-center">
              <div id="user-icons">
                <div onClick={handleShow} className="link text-muted" to={'/cart'} title="cart">
                  <i className="fad fa-shopping-cart"></i>
                </div>
                <Link className="link text-muted" to={'/dashboard'} title="profile">
                  <i className="fad fa-user"></i>
                </Link>
              </div>
            </div>
          </div>
        </Container>
        <Container className="d-flex justify-content-center align-items-center gap-2 mt-3 d-none d-md-flex flex-wrap">
          {loading ? (
            <SkeletonLoading count={8} height={20} width={100} />
          ) : (
            categories.map((item, index) => (
              <Link
                style={{ color: '#ff5722' }}
                key={index}
                className="text-decoration-none"
                title={item.title}
                to={`/categories/${item.id}`}
              >
                {SliceText(item.title, 10)}
              </Link>
            ))
          )}
          <Link to={'/categories'} className="btn btn-outline-secondary rounded-pill">
            Show All
          </Link>
        </Container>
      </div>
    </>
  );
}
