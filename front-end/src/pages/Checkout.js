import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
// import { makeStyles } from '@material-ui/core/styles';
// import { transformCurrency } from '../service'
import Loading from '../components/Loading';
import InvoiceTotal from '../components/InvoiceTotal';
import Address from '../components/Address';

async function getOrders(user, setData) {
  let url = 'http://localhost:3001/products/checkout';
  //   if (!user.role) url += '/user';
  await fetch(url, { headers: { authorization: user.token } })
    .then(res => res.json())
    .then(({ data }) => setData(data));
}

// const useStyles = makeStyles(() => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   span: {
//     justifyContent: 'space-around',
//     border: '1px solid black',
//   },
// }));

// function cards(classe, data) {
//   return data.map(({ quantity, name, price }) => (
//     <div className={classe.container}>
//       <span className={classe.span}>{quantity}</span>
//       <span className={classe.span}>{name}</span>
//       <span className={classe.span}>{transformCurrency(price)}</span>
//     </div>
//   ));
// }

function Checkout() {
  const [data, setData] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  //const classes = useStyles();

  useEffect(() => {
    getOrders(user, setData);
  }, []);

  if (!data) return <Loading />;
  console.log('data', data);

  return (
    <div>
      <SideBar
        title='Cliente - Checkout'
        children={
          <div>
            <InvoiceTotal data={data} />
          </div>
        }
      />
      <br />
      <div>
        <Address />
      </div>
    </div>
  );
}

export default Checkout;
