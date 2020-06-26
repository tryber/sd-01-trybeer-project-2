import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function handleSubmit(e, setCheckout, address, number ) {
  e.preventDefault();
  setCheckout([address, number]);
}

export default function Address({ setCheckout }) {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Endereço
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => handleSubmit(e, setCheckout, address, number)}>
          <TextField
            multiline
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='adreess'
            label='Rua:'
            autoFocus
            value={address}
            onChange={event => setAddress(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Número'
            id='number'
            type='number'
            autoFocus
            value={number}
            onChange={event => setNumber(event.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Finalizar Pedido
          </Button>
        </form>
      </div>
    </Container>
  );
}
