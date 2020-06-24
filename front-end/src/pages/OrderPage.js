import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import OrderCard from '../components/OrderCard';
import SideBar from '../components/SideBar';

async function getOrders(user, setData) {
  let url = 'http://localhost:3001/orders';
  if (!user.role) url += '/user';

  await fetch(url, { headers: { authorization: user.token } })
    .then((res) => res.json())
    .then((result) => setData(result));
}

function sortData(data) {
  const deliveredSort = data.sort((a, b) => a.props.order.finished - b.props.order.finished);
  const dateSort = data.sort((a, b) => (
    new Date(b.props.order.purchase_date) - new Date(a.props.order.purchase_date))
  );
  return data[0].props.isAdmin ? deliveredSort : dateSort;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

function OrderPage() {
  const [data, setData] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    if (user) getOrders(user, setData);
  }, []);

  if (data.message || !user) return <Redirect to='/login'/>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <SideBar title="Pedidos" children={
        <div className={classes.container}>
          {sortData(data.map(order => <OrderCard key={order.purchase_id} order={order} isAdmin={user.role} />))}
        </div>}
      />
      
    </div>
  );
}

export default OrderPage;