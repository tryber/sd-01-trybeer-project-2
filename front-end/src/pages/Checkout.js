import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Loading from '../components/Loading';
import InvoiceTotal from '../components/InvoiceTotal';
import Address from '../components/Address';
import { getOrders, sendAddress } from '../service'



function Checkout() {
  const [data, setData] = useState('');
  const [checkout, setCheckout] = useState('');
  const [price, setPrice] = useState('');
  
  console.log('que porra tem aqui?', checkout)

  const user = JSON.parse(localStorage.getItem('user'));

  
  useEffect(() => {
    getOrders(user, setData);
  }, []);
  
  useEffect(() => {
    const invoice = { 
      purchase_date: Date.now(),
      street: checkout[0],
      number: checkout[1],
    }
    sendAddress(invoice);
  }, [checkout]);

  if (!data) return <Loading />;

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
        <Address setCheckout={setCheckout}/>
      </div>
    </div>
  );
}

export default Checkout;
