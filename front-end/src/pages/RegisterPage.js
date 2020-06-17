import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateLogin, sendData } from '../service';

function RegisterPage() {
  const [isLoged, setIsLoged] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [wantSell, setWantSell] = useState(false);
  useEffect(() => {
    validateLogin(setIsAdmin, setIsLoged);
  }, []);
  if ((isLoged || shouldRedirect) && isAdmin) return <Redirect to='/admin/home' />;
  if ((isLoged || shouldRedirect) && !isAdmin) return <Redirect to='/cliente/products' />;
  return (
    <div>
      <form onSubmit={(e) => sendData(e, { email, password, name, wantSell }, setShouldRedirect, 'register')}>
        <label htmlFor="name">Nome</label>
        <input type="text" data-testid="signup-name" id="name" name="name" pattern="^[a-zA-Z]{12,40}$" onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="email">Email</label>
        <input type="email" data-testid="signup-email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" data-testid="signup-password" name="password" pattern="^[0-9]{6,20}$" required onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="checkbox">Quero vender</label>
        <input type="checkbox" name="checkbox" data-testid="signup-seller" onChange={(e) => setWantSell(e.target.value)} />
        <button data-testid="signup-btn">CADASTRAR</button>
      </form>
    </div>
  );
}

export default RegisterPage;
