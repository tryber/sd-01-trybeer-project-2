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
      <Link color="inherit" href="https://material-ui.com/">
        Trybeer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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

const textFieldMail = (setEmail) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      type="email" 
      data-testid="email-input" 
      id="email" 
      name="email" 
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      label="Email"
      autoComplete="email"
      autoFocus
    />
  );
}

const textFieldPassword = (setPassword) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      type="password" 
      data-testid="password-input" 
      pattern="^[0-9]{6,20}$" 
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      name="password"
      label="Password"
      id="password"
      autoComplete="current-password"
    />
  );
}

const formControl = () => {
  return (
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Me lembre"
    />
  );
}

const btnEntrar = (classes) => {

  return (
    <Button
      type="submit"
      fullWidth
      data-testid="signin-btn"
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Sign In
    </Button>
  );
}

const gridLogin = (setShouldRedirect) => {
  return (
    <Grid container>
      <Grid item xs>
        <Link href="#" variant="body2">
          Esqueceu a senha?
        </Link>
      </Grid>
      <Grid item>
        <Link 
          href="#" 
          variant="body2"
          data-testid="no-account-btn"
          onClick={() => setShouldRedirect(true)}
        >
          {"Ainda não tem uma conta? Cadastre-se"}
        </Link>
      </Grid>
    </Grid>
  );
}
function LoginPage({ location: { pathname } }) {
  const [isLoged, setIsLoged] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  useEffect(() => {
    validateLogin(setIsAdmin, setIsLoged);
  }, []);

  if (isLoged && isAdmin) return <Redirect to='/admin/orders' />;
  if (isLoged && !isAdmin) return <Redirect to='/products' />;
  if (shouldRedirect) return <Redirect to='/register' />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => sendData(e, { email, password }, 'login', setIsAdmin, setIsLoged)}>
          {textFieldMail(setEmail)}
          {textFieldPassword(setPassword)}
          {formControl()}
          {btnEntrar(classes)}
          {gridLogin(setShouldRedirect)}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginPage;
