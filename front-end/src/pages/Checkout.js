import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Loading from '../components/Loading';
import InvoiceTotal from '../components/InvoiceTotal';
import Address from '../components/Address';
import { getOrders, sendAddress } from '../service';
import { Redirect } from 'react-router-dom';

function sideBar(data, setShouldUpdate) {
  return (
    <SideBar
      title='Cliente - Checkout'
      children={
        <div>
          <InvoiceTotal data={data} setShouldUpdate={setShouldUpdate}/>
        </div>
      }
    />
  );
}

function Checkout() {
  const [data, setData] = useState('');
  const [checkout, setCheckout] = useState('');
  const [shouldUpdate, setShouldUpdate] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    getOrders(user, setData);
    setShouldUpdate(false);
  }, [shouldUpdate]);
  useEffect(() => {
    const invoice = {
      purchase_date: Date.now(),
      street: checkout[0],
      number: checkout[1],
    };
    sendAddress(invoice);
  }, [checkout]);
  if (!user) return <Redirect to="/login" />
  if (!data) return <Loading />;
  return (
    <div>
      {sideBar(data, setShouldUpdate)}
      <Address setCheckout={setCheckout} />
    </div>
  );
}

export default Checkout;
