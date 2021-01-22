import React, { useState } from 'react';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { makeStyles, fade } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    height: '50vh',
    display: 'flex',
    justify: 'center',
    alignItems: 'center'
  },
  adminRoot: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  }
}));


export default function Notfound(props) {
  const url = 'http://www.kimoxscripts.com/server/'
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  function login() {
    setError('')
    if (email && password) {
      axios.get(`${url}login?Email=${email}&Password=${password}`)
        .then(function (response) {
          setToken(response.data.data._token)
          setAuth(true)
          console.log(response.data.data._token)
        })
        .catch(function (error) {
          setError(error.message)
        });
    }
    else {
      setError('Please fill your info.')
    }
  }

  return (
    <div >
      <form className={classes.root} noValidate autoComplete="off">
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={12}>
            <Input placeholder="Email" onChange={e => setEmail(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button className={classes.button} onClick={() => { login() }} variant="contained">Login</Button>
          </Grid>
          <p style={{ color: 'red' }}>{error ? error : ''}</p>
        </Grid>
      </form>
    </div>
  );
}

