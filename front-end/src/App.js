import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
// import SideBar from './components/SideBar'
import Card from './components/Cards'

function App() {
  return (
    <div>
      {/* <Card
      key={'1'}
        image={
          'https://apoioentrega.vteximg.com.br/arquivos/ids/450246-1000-1000/1388.jpg?v=637003353652200000'
        }
        price={'R$2,79'}
        description={'Cerveja Skol Lata 473 ml Embalgem com 12 Unidades'}
        quantity={'2'}
      /> */}
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
