import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { CategoriesUrl } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import './Categories.css';
import { Link } from 'react-router-dom';
import SliceText from '../../../Services/SliceText';
import SkeletonLoading from '../../../Components/Website/SkeletonLoading/SkeletonLoading';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CategoriesUrl}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div id="categories">
      <Container>
        <div className="categories-list row">
          <h1 className="title text-muted fw-bold my-3">Categories</h1>
          {loading ? (
            <SkeletonLoading count={50} height={60} customClasses={'col-lg-2 col-md-3 col-6 p-1'} />
          ) : (
            categories.map((item, index) => (
              <Link
                className="col-lg-2 col-md-3 col-6 p-1 text-decoration-none"
                title={item.title}
                to={`/categories/${item.id}`}
                key={index}
              >
                <div className="category-item">
                  <div className="image rounded d-flex align-items-center justify-content-center">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <p className="m-0 text-black">{SliceText(item.title, 14)}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}
