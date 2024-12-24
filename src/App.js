import { Route, Routes } from 'react-router-dom';

// Website Routes
import HomePage from './Pages/Website/HomePage/HomePage';
import SiteCategories from './Pages/Website/Categories/Categories';

// Dashboard Routes
import Dashboard from './Pages/Dashboard/Dashboard';

// Auth Routes
import Login from './Pages/Auth/AuthPages/Login';
import Register from './Pages/Auth/AuthPages/Register';
import GoogleCallBack from './Pages/Auth/AuthPages/GoogleCallBack';

// Protection Routes
import RequireAuth from './Pages/Auth/Protection/RequireAuth';
import ProtectAuth from './Pages/Auth/Protection/ProtectAuth';

// Users Routes
import Users from './Pages/Dashboard/Users/Users';
import User from './Pages/Dashboard/Users/User';
import AddUser from './Pages/Dashboard/Users/AddUser';

// Moderator Routes
import Moderator from './Pages/Dashboard/Moderator/Moderator';

// Error Routes
import Error404 from './Pages/Auth/Errors/Error404';

// Categories Routes
import Categories from './Pages/Dashboard/Category/Categories';
import AddCategory from './Pages/Dashboard/Category/AddCategory';
import Category from './Pages/Dashboard/Category/Category';

// Products Routes
import Products from './Pages/Dashboard/Product/Products';
import AddProduct from './Pages/Dashboard/Product/AddProduct';
import UpdateProduct from './Pages/Dashboard/Product/Product';
import Website from './Pages/Website/Website';
import SingleProduct from './Pages/Website/SingleProduct/SingleProduct';

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<SiteCategories />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>

        <Route element={<ProtectAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Error404 />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={['1995', '1996', '1999']} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={['1995']} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={['1995', '1999']} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRole={['1995', '1996']} />}>
              <Route path="moderator" element={<Moderator />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
