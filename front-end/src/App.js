import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/admin/profile' component={ProfilePage} />
          <Route path='/orders' component={OrderPage} />
          <Route path='/admin/orders' component={OrderPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
