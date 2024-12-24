import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { Button, Container } from 'react-bootstrap';
import { useContext, useEffect, useRef, useState } from 'react';
import { Axios } from '../../../Api/axios';
import { CartUrl, ProductUrl } from '../../../Api/Api';
import './SingleProduct.css';
import CalculateRating from '../../../Services/CalculateRating';
import SkeletonLoading from '../../../Components/Website/SkeletonLoading/SkeletonLoading';
import { CartReloading } from '../../../Context/CartReloadingContext';
import PlusAndMinusBtn from '../../../Components/Website/PlusAndMinusBtn/PlusAndMinusBtn';
import Swal from 'sweetalert2';
import { WindowSize } from '../../../Context/WindowContext';

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnCount, setBtnCount] = useState(1);
  const { setIsChange } = useContext(CartReloading);
  const { width } = useContext(WindowSize);
  const addToCartBtnRef = useRef('');
  const { id: pId } = useParams();
  useEffect(() => {
    Axios.get(`${ProductUrl}/${pId}`)
      .then((res) => {
        setProduct(res.data[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [pId]);

  let images = [];

  product.images?.map((img) =>
    images.push({
      original: img.image,
      thumbnail: img.image,
    })
  );

  // const handleAddToCart = (e) => {
  //   if (
  //     product.stock > 0 &&
  //     btnCount <= product.stock &&
  //     JSON.parse(localStorage.getItem('products')).find((item) => +item.id === +pId)?.count + btnCount <= product.stock
  //   ) {
  //     let currentProducts = JSON.parse(localStorage.getItem('products')) || [];
  //     const productExists = currentProducts.find((item) => +item.id === +pId);

  //     if (productExists) {
  //       currentProducts = currentProducts.map((item) =>
  //         +item.id === +pId ? { ...item, count: (item.count || 0) + btnCount } : item
  //       );
  //     } else {
  //       currentProducts.push({ ...product, count: btnCount });
  //     }

  //     localStorage.setItem('products', JSON.stringify(currentProducts));
  //     setIsChange((prev) => !prev);

  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: `${btnCount} Item${btnCount > 1 ? 's' : ''} added to Cart`,
  //       showConfirmButton: false,
  //       timer: 800,
  //     });
  //   } else {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Out of stock',
  //       showConfirmButton: false,
  //       timer: 800,
  //     });
  //   }
  //   // addToCartBtnRef.current.innerHTML = 'Added To Cart';
  // };

  const handleAddToCart = async (e) => {
    const check = await checkStock();
    let currentProducts = JSON.parse(localStorage.getItem('products')) || [];

    const productExists = currentProducts.find((item) => +item.id === +pId);
    const existingCount = productExists ? productExists.count : 0;

    if (check && product.stock > 0 && btnCount <= product.stock && existingCount + btnCount <= product.stock) {
      if (productExists) {
        currentProducts = currentProducts.map((item) =>
          +item.id === +pId ? { ...item, count: (item.count || 0) + btnCount } : item
        );
      } else {
        currentProducts.push({ ...product, count: btnCount });
      }

      localStorage.setItem('products', JSON.stringify(currentProducts));
      setIsChange((prev) => !prev);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${btnCount} Item${btnCount > 1 ? 's' : ''} added to Cart`,
        showConfirmButton: false,
        timer: 800,
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Out of stock',
        showConfirmButton: false,
        timer: 800,
      });
    }
  };
  const checkStock = async () => {
    try {
      setLoading(true);
      await Axios.post(`${CartUrl}/check`, {
        product_id: product.id,
        count: btnCount,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="single-product">
      <Container>
        {loading ? (
          <div className="row mb-5">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="mt-5">
                <div className="w-100">
                  <SkeletonLoading count={1} height={300} />
                </div>
                <div className="w-100 d-flex">
                  <SkeletonLoading count={1} height={100} customClasses={'col-4 p-1'} />
                  <SkeletonLoading count={1} height={100} customClasses={'col-4 p-1'} />
                  <SkeletonLoading count={1} height={100} customClasses={'col-4 p-1'} />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-12 mt-5">
              <SkeletonLoading count={1} height={30} customClasses={'col-4 w-100'} />
              <SkeletonLoading count={1} height={20} customClasses={'col-4 w-25'} />
              <SkeletonLoading count={1} height={50} customClasses={'col-4 mt-4 w-50'} />
            </div>
          </div>
        ) : (
          <div className="row mt-md-5 mt-2">
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery items={images} />
            </div>
            <div className="product-info col-lg-8 col-md-6 col-12 d-flex flex-column justify-content-between">
              <div className="product-main-info mt-md-0 mt-5">
                <h2 className="title">{product.title}</h2>
                <div className="about text-muted">{product.About}</div>
                <div className="desc">{product.description}</div>
              </div>
              <div className="product-more-info border-top pt-4 d-flex align-items-center justify-content-between">
                <div>
                  <CalculateRating item={product.rating} />
                  <div className="price">
                    <div>
                      Price: {product.discount ? +product.price - +product.discount : +product.price} EGP{' '}
                      <span className="text-decoration-line-through text-muted h6">
                        {product.discount && +product.price} EGP
                      </span>
                    </div>
                  </div>
                </div>
                <div className="reserve d-flex align-items-center align-items-lg-end gap-1 justify-content-end flex-column">
                  <div className="quantity d-flex align-items-center gap-2 justify-content-end flex-lg-row flex-column">
                    <PlusAndMinusBtn width={width > 992 ? '50' : '75'} setBtnCount={(data) => setBtnCount(data)} />
                    <Button
                      onClick={handleAddToCart}
                      variant="outline-secondary"
                      className="add-to-cart fs-5"
                      title="Add to cart"
                      ref={addToCartBtnRef}
                      disabled={btnCount === 0 || product.stock === 0}
                    >
                      Add to cart <i className="fa-duotone fa-solid fa-cart-plus"></i>
                    </Button>
                  </div>
                  {product.stock <= 5 && (
                    <div className="stock text-danger ">
                      {+product.stock > 0 ? `Only ${+product.stock} left in stock` : "item isn't available"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
