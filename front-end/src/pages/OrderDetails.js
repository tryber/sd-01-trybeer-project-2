import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';

async function getOrders(user, setData, id) {
  const url = `http://localhost:3001/orders/${id}`;

  await fetch(url, { headers: { authorization: user.token } })
    .then((res) => res.json())
    .then((result) => setData(result));
}

async function updateStatus(user, id, setShowButton) {
  const url = `http://localhost:3001/orders/${id}`;

  const res = await fetch(url, { method: 'PUT', headers: { authorization: user.token } })
    .then(response => response.json());
  if (res.message === 'Pedido entregue com sucesso!') setShowButton(false);
}

function renderProducts(products, classes) {
  return products.map((product, index) => {
    const { quantity, name, price } = product;
    return (
      <p className={classes.product} key={name}>
        <span>
          <span data-testid={`${index}-product-qtd`}>{quantity}</span>
          {' - '}
          <span data-testid={`${index}-product-name`}>{name}</span>
        </span>
        <span data-testid={`${index}-product-total-value`}>R$ {price * quantity}</span>
      </p>
    );
  })
}

function renderDetails(params) {
  const { data, purchaseDate, status, testid, user, id, classes, setShowButton } = params;
  const { finished, price, products } = data;
  return (
    <div>
      <h1>Pedido <span data-testid="order-number">{id}</span> - <span data-testid={testid}>{user.role ? status : purchaseDate}</span></h1>
      <div className={classes.container}>
        {renderProducts(products, classes)}
        <h1 className={classes.totalPrice}>Total: <span data-testid="order-total-value">R$ {price}</span></h1>
      </div>
      {!finished && <button data-testid="mark-as-delivered-btn" onClick={() => updateStatus(user, id, setShowButton)}>Marcar como Entregue</button>}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    border: '1px solid black',
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  product: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2rem',
    padding: 5,
  },
  totalPrice: {
    textAlign: 'end',
  },
});

function OrderDetails(props) {
  const [data, setData] = useState('');
  const [showButton, setShowButton] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const id = props.match.params.id;
  const classes = useStyles();

  useEffect(() => {
    if (user) getOrders(user, setData, id);
  }, [showButton]);

  if (data.message || !user) return <Redirect to='/login'/>;
  if (!data) return <div>Loading...</div>;

  const { finished, purchase_date } = data;
  const status = finished ? 'Entregue' : 'Pendente';
  const date = new Date(purchase_date);
  const purchaseDate = `${date.getDate()}/${date.getMonth()}`;
  const testid = user.role ? 'order-status' : 'order-date';
  const params = { data, purchaseDate, status, testid, user, id, classes, setShowButton };

  return (
    <SideBar title={`Detalhes - Pedido ${id}`} children={renderDetails(params)} />
  );
}

export default OrderDetails;
