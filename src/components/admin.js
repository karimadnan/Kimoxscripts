import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import UploadChild from './childs/uploadScript';
import OtcUsers from './childs/otcUsers';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    height: '50vh',
    display: 'flex',
    justify: 'center',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1),
  },
  tabs: {
    margin: theme.spacing(1)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function Admin() {
  const url = 'http://www.kimoxscripts.com/server/'
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  function logged() {
    return (
      <div>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Upload Script" {...a11yProps(0)} />
          <Tab label="Add OTC_USER" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UploadChild token={token} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OtcUsers token={token} />
        </TabPanel>
      </div>
    )
  }

  function notLogged() {
    return (
      <div>
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
    )
  }

  return (
    <div>
      {auth ? logged() : notLogged()}
    </div>
  );
}

