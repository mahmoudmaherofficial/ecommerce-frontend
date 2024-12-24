import { Button } from 'react-bootstrap';
import './Product.css';
import { NavLink } from 'react-router-dom';
import CalculateRating from '../../../Services/CalculateRating';

export default function Product(props) {
  const { product } = props;

  return (
    <div className="col-lg-3 col-md-6 col-12 p-1" title={product.description}>
      <NavLink to={`/product/${product.id}`} className="product-card border rounded p-3 h-100">
        <div className="main-info border-bottom pb-3">
          <p className="mb-1 text-truncate fw-bold text-capitalize" style={{ fontSize: '1.1rem' }}>
            {product.title}
          </p>
          <p className="text-muted mb-2 text-truncate text-lowercase">{product.description}</p>
          <div className="img-container p-2 position-relative">
            <img src={product.images?.[0]?.image} className="img-fluid rounded" alt={product.title} />
            {product.discount && (
              <span
                className="position-absolute top-0 start-0 text-white badge text-center text-uppercase"
                style={{ backgroundColor: '#ff5722', fontSize: '0.8rem' }}
              >
                Sale {Math.ceil((+product.discount / +product.price) * 100)}%
              </span>
            )}
          </div>
        </div>
        <div className="more-info mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <div className="stars">
                <CalculateRating item={product.rating} />
              </div>
              <div
                className="price d-flex justify-content-between align-items-center gap-2"
                style={{ fontSize: '1rem', fontWeight: 'bold' }}
              >
                <span>{product.discount ? +product.price - +product.discount : +product.price} EGP</span>
                {product.discount && (
                  <span
                    className="text-muted text-decoration-line-through m-0"
                    style={{ fontSize: '0.9rem', fontWeight: 'normal' }}
                  >
                    {+product.price} EGP
                  </span>
                )}
              </div>
            </div>
            <Button variant="outline-secondary" className="add-to-cart" title="Add to cart">
              <i className="fa-duotone fa-solid fa-cart-plus"></i>
            </Button>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
