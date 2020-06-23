import React from 'react';
import { Link } from 'react-router-dom';

function OrderCard({ order, isAdmin }) {
  const linkRoute = isAdmin ? '/admin' : '';
  const orderStatus = order.finished ? 'Entregue' : 'Pendente';
  const adminPage = isAdmin ? true : false;
  const date = new Date(order.purchase_date);
  const purchaseDate = `${date.getDate()}/${date.getMonth()}`;

  return (
    <Link to={`${linkRoute}/orders/${order.purchase_id}`}>
      <div>
        <h3>{`Pedido ${order.purchase_id}`}</h3>
        {adminPage && <p>{`${order.street}, ${order.number}`}</p>}
        <div>
          <p><strong>{`R$ ${order.price}`}</strong></p>
          <p>{adminPage ? orderStatus : purchaseDate}</p>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
