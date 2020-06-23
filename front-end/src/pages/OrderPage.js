import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import OrderCard from '../components/OrderCard';

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

function OrderPage() {
  const [data, setData] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) getOrders(user, setData);
  }, []);

  if (data.message || !user) return <Redirect to='/login'/>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      {sortData(data.map(order => <OrderCard key={order.id} order={order} isAdmin={user.role} />))}
    </div>
  );
}

export default OrderPage;