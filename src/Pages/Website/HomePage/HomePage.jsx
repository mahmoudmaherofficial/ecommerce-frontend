import './HomePage.css';
import Landing from '../../../Components/Website/Landing/Landing';
import LastSaleProducts from '../LastSaleProducts/LastSaleProducts';
import TopAd from '../TopAd/TopAd';
import { Container } from 'react-bootstrap';
import Recommendation from '../../../Components/Website/Recommendation/Recommendation';
import { LatestProductsUrl, TopRatedProductsUrl } from '../../../Api/Api';
export default function HomePage() {
  return (
    <div id="home-page">
      <Landing />
      <LastSaleProducts />
      <TopAd />
      <Container>
        <div className="row">
          <div className="col-12 col-lg-6">
            <Recommendation apiPath={TopRatedProductsUrl} title="Top Rated Products" />
          </div>
          <div className="col-12 col-lg-6">
            <Recommendation apiPath={LatestProductsUrl} title="Latest Products" />
          </div>
        </div>
      </Container>
    </div>
  );
}
