import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateLogin } from '../service';

async function sendData(event, data, setShouldRedirect) {
  event.preventDefault();
  const result = await fetch('http://localhost/3001/login', { method: 'POST', headers: data }).then(res => res.json());
  localStorage.setItem('user', JSON.stringify(result));
  setShouldRedirect(true);
}

function LoginPage() {
  const [isLoged, setIsLoged] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    validateLogin(setIsAdmin, setIsLoged);
  }, []);

  if (isLoged && isAdmin) return <Redirect to='/admin/home' />;
  if (isLoged && !isAdmin) return <Redirect to='/cliente/products' />;
  if (shouldRedirect) return <Redirect to='/register' />;

  return (
    <div>
      <form onSubmit={(e) => sendData(e, { email, password }, setShouldRedirect)}>
        <label htmlFor="email">Email</label>
        <input type="email" data-testid="email-input" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Senha</label>
        <input type="password" data-testid="password-input" id="password" name="password" pattern="^[0-9]{6,20}$" required onChange={(e) => setPassword(e.target.value)} />
        <button data-testid="signin-btn" >Entrar</button>
      </form>
      <button type="submit" data-testid="no-account-btn">Ainda não tenho conta</button>
    </div>
  );
}

export default LoginPage;
