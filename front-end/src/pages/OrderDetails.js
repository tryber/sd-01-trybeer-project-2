import React from 'react';
import { Redirect } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { makeStyles } from '@material-ui/core/styles';

async function getOrders(user, setData) {
  let url = 'http://localhost:3001/orders';
  if (!user.role) url += '/user';

  await fetch(url, { headers: { authorization: user.token } })
    .then((res) => res.json())
    .then((result) => setData(result));
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

function OrderDetails(props) {
  const [data, setData] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const id = props.match.params.id;
  const classes = useStyles();

  useEffect(() => {
    if (user) getOrders(user, setData);
  }, []);

  if (data.message || !user) return <Redirect to='/login'/>;
  if (!data) return <div>Loading...</div>;
  return (
    <SideBar title={`Detalhes - Pedido ${id}`} children={
      'DETALHE'
    } />
  );
}

export default OrderDetails;
