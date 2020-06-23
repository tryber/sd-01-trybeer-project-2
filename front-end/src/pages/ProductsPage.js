import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cards from '../components/Cards';
import { validateLogin } from '../service';

async function getProducts() {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return await fetch('http://localhost:3001/products', { headers: { authorization: token } })
    .then((res) => res.json())
    .then((result) => result);
}

function ProductsPage() {
  const [isLoged, setIsLoged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    async function login() {
      const user = await validateLogin(setIsAdmin, setIsLoged);
      if(user) {
        const products = await getProducts();
        setData(products);
      }
    }
    login();
  }, []);

  console.log(data);
  if (!isLoged) return <Redirect to='/login' />;
  if (isAdmin) return <Redirect to='/home' />;
  if (!data) return <div>Loading...</div>;

  return <div>aaaa</div>
}

export default ProductsPage;
