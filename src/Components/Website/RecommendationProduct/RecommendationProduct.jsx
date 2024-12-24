import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CalculateRating from '../../../Services/CalculateRating';
import './RecommendationProduct.css';

export default function RecommendationProduct(props) {
  const { product } = props;
  return (
    <NavLink to={`/product/${product.id}`} className="recommendation-product d-flex align-items-center gap-2 w-100">
      <div className="image rounded">
        <img src={product.images?.[0]?.image} className="" alt={product.title} />
      </div>
      <div className="product-info d-flex flex-column justify-content-between gap-4 h-100">
        <div className="product-details">
          <h5 className="title text-truncate m-0">{product.title}</h5>
          <h6 className="desc text-muted text-truncate m-0">{product.description}</h6>
        </div>
        <div className="more-info">
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
      </div>
    </NavLink>
  );
}
