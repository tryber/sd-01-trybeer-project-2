import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateLogin, sendData } from '../service';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/tryber/sd-01-trybeer-project-2">
        Trybeer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useingStyles = makeStyles((theme) => ({
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const textFieldName = (setName) => {
  return (
  <Grid item xs={12} >
    <TextField
      type="text"
      data-testid="signup-name"
      id="name"
      name="name"
      pattern="^[a-zA-Z\s]{12,40}$"
      onChange={(e) => setName(e.target.value)}
      autoComplete="fname"
      variant="outlined"
      required
      fullWidth
      label="Nome"
      autoFocus
    />
  </Grid>
  );
}

const textFieldMail = (setEmail) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        type="email"
        data-testid="signup-email"
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
      />
    </Grid>
  );
}

const textFieldPass = (setPassword) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        type="password"
        data-testid="signup-password"
        pattern="^[0-9]{6,20}$"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    </Grid>
  );
}

const formControl = (setRole) => {
  return (
    <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox value="allowExtraEmails" color="primary" />}
        label="Quero vender"
        type="checkbox"
        name="checkbox"
        data-testid="signup-seller"
        onClick={(e) => setRole(e.target.checked)}
      />
    </Grid>
  );
}

const btnEntrar = (classes) => {

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      data-testid="signup-btn"
    >
      Cadastrar-se
    </Button>
  );
}

const gridLogin = () => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Link 
          href="/login"
          variant="body2"
        >
          Já tem uma conta? Entre aqui
        </Link>
      </Grid>
    </Grid>
  );
}

const generateForm = (param) => {
  const { sendData, setIsLoged, setIsAdmin, email, setEmail, password, setPassword, name, setName, role, setRole } = param;
  const classes = useingStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => sendData(e, { email, password, name, role }, 'user', setIsAdmin, setIsLoged)}>
          <Grid container spacing={2}>
            {textFieldName(setName)}
            {textFieldMail(setEmail)}
            {textFieldPass(setPassword)}
            {formControl(setRole)}
          </Grid>
          {btnEntrar(classes)}
          {gridLogin()}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

function RegisterPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoged, setIsLoged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState(false);

  useEffect(() => {
    validateLogin(setIsAdmin, setIsLoged);
  }, []);

  if (isLoged && isAdmin) return <Redirect to='/admin/orders' />;
  if (isLoged && !isAdmin) return <Redirect to='/products' />;

  const allProperties = { sendData, setIsLoged, setIsAdmin, email, setEmail, password, setPassword, name, setName, role, setRole, };
  return (
    <div>
      {generateForm(allProperties)}
    </div>
  );
}

export default RegisterPage;
