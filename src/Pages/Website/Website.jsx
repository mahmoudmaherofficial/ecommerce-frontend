import { Outlet } from 'react-router-dom';
import MainNavBar from '../../Components/Website/MainNavBar/MainNavBar';
import Footer from '../../Components/Website/Footer/Footer';

export default function Website() {
  return (
    <>
      <MainNavBar />
      <div style={{ minHeight: 'calc(100vh - (112px + 105px + 0.5rem + 3rem))' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
