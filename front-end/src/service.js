import api from './api';
import { toast } from 'react-toastify';

export async function validateLogin(setIsAdmin, setIsLoged) {
  if (!JSON.parse(localStorage.getItem('user'))) return setIsLoged(false);
  const result = await fetch('http://localhost:3001/user', {
    method: 'GET',
    headers: { authorization: JSON.parse(localStorage.getItem('user')).token },
  }).then(res => res.json());
  if (!result || result.message === 'jwt expired') {
    setIsLoged(false);
    return false;
  }
  if (result.role) setIsAdmin(true);
  setIsLoged(true);
  return true;
}

export async function sendData(event, data, url, setIsAdmin, setIsLoged) {
  const result = await fetch(`http://localhost:3001/${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
  if (result.message) return alert('Email já cadastrado');
  localStorage.setItem('user', JSON.stringify(result));
  if (result.role) setIsAdmin(true);
  setIsLoged(true);
}

export function userLogout() {
  return localStorage.removeItem('user');
}

export function transformCurrency(currency) {
  return currency.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  });
}

export async function deleteProduct(name) {
  const user = JSON.parse(localStorage.getItem('user'));
  let endPoint = `/products/${name}`;
  const config = { headers: { authorization: user.token } };
  try {
    api.delete(endPoint, config);
  } catch (error) {
    toast.error(error.message);
  }
}

export async function getOrders(user, setData) {
  let endPoint = '/products/checkout';
  const config = { headers: { authorization: user.token } };
  try {
    api.get(endPoint, config).then(({ data }) => setData(data.data));
  } catch (error) {
    toast.error(error.message);
  }
}

export async function sendAddress(data) {
  const url = 'http://localhost:3001/products/checkout';
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, config, { body: JSON.stringify(data) }).then(res =>
    res.json(),
  );
}
