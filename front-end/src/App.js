import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/products' component={ProductsPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/admin/profile' component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
