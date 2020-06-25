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
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    async function login() {
      const user = await validateLogin(setIsAdmin, setIsLoged);
      if (user) {
        const products = await getProducts();
        setTotalValue(products.reduce((acc, value) => acc + (value.price * (value.quantity || 0)), 0))
        setData(products);
      }
    }
    login();
  }, []);

  if (!isLoged) return <Redirect to='/login' />;
  if (isAdmin) return <Redirect to='/home' />;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div className='products-container'>{data.map((product) =>
        <Cards
          price={product.price}
          name={product.name}
          quantity={product.quantity || 0}
          image={`http://localhost:3001/${product.name}.jpg`}
          func={submitProduct}
          setTotal={{ totalValue, setTotalValue }}
        />)}
      </div>
      <div>
        <button data-testid="checkout-bottom-btn">
          <p>Ver carrinho</p>
          <p data-testid="checkout-bottom-btn-value">
            R${totalValue.toFixed(2)}
          </p>
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;
