import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Cards from '../components/Cards';
import { validateLogin } from '../service';
import './ProductsPage.css';

async function getProducts() {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return await fetch('http://localhost:3001/products', { headers: { authorization: token } })
    .then((res) => res.json())
    .then((result) => result);
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

function ProductsPage() {
  const [isLoged, setIsLoged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState('');

  const classes = useStyles();

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

  return <div className={classes.container}>{data.map((product) =>
    <Cards
      price={product.price}
      name={product.name}
      quantity={product.quantity || 0}
      image={`http://localhost:3001/${product.name}.jpg`} />)}
  </div>
}

export default ProductsPage;
