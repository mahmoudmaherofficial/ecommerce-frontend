import { useEffect, useState } from 'react';
import { Axios } from '../../../Api/axios';
import { LatestSaleProductsUrl } from '../../../Api/Api';
import { Container } from 'react-bootstrap';
import Product from '../../../Components/Website/Product/Product';
import SkeletonLoading from '../../../Components/Website/SkeletonLoading/SkeletonLoading';

export default function LastSaleProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get(`${LatestSaleProductsUrl}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="products mt-3">
      <h1 style={{ color: '#ff5722' }}>Deals of the day</h1>
      <div className="d-flex align=items-center justify-content-center">
        <div className="row w-100">
          {loading ? (
            <div className="row w-100">
              <SkeletonLoading count={4} height={400} customClasses={'col-lg-3 col-md-6 col-12 p-1'} />
            </div>
          ) : (
            products.map((product,idx) => <Product product={product} key={idx} />)
          )}
        </div>
      </div>
    </Container>
  );
}
