import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cards from '../components/Cards';
import { validateLogin } from '../service';
import './ProductsPage.css';

async function getProducts() {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return await fetch('http://localhost:3001/products', { headers: { authorization: token } })
    .then((res) => res.json())
    .then((result) => result);
}

async function submitProduct(productName, quantity) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  await fetch('http://localhost:3001/products',
    {
      method: 'POST',
      headers: {
        authorization: token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName, quantity })
    });
}
function ProductsPage() {
  const [isLoged, setIsLoged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    async function login() {
      const user = await validateLogin(setIsAdmin, setIsLoged);
      if (user) {
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

  return <div className='products-container'>{data.map((product) =>
    <Cards
      price={product.price}
      name={product.name}
      quantity={product.quantity || 0}
      image={`http://localhost:3001/${product.name}.jpg`}
      func={submitProduct}
    />)}
  </div>
}

export default ProductsPage;
