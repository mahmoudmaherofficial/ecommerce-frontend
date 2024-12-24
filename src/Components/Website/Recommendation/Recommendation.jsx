import { useEffect, useState } from 'react';
import { Axios } from '../../../Api/axios';
import './Recommendation.css';
import SkeletonLoading from '../../../Components/Website/SkeletonLoading/SkeletonLoading';
import RecommendationProduct from '../RecommendationProduct/RecommendationProduct';

export default function Recommendation({ apiPath, title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${apiPath}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div id="top-rated-products">
      <h1 className="text-center mb-3">{title}</h1>
      <div className="products-container p-3 d-flex flex-column gap-4">
        {loading ? (
          <SkeletonLoading count={5} height={150} />
        ) : (
          products.map((product) => {
            return <RecommendationProduct product={product} key={product.id} />;
          })
        )}
      </div>
    </div>
  );
}
