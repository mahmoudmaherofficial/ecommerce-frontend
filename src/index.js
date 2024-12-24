import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './Styles/Shared/form.css';
import './Styles/Shared/LoadingScreen.css';
import './custom.css';
import 'react-loading-skeleton/dist/skeleton.css';
// import './Components/Dashboard/Pagination.css'

import App from './App';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import CartReloadingContext from './Context/CartReloadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WindowContext>
    <MenuContext>
      <CartReloadingContext>
        <Router>
          <App />
        </Router>
      </CartReloadingContext>
    </MenuContext>  
  </WindowContext>
);
