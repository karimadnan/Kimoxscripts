import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles, fade } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  scrollTab: {
    background: fade("#212121", 0.125),
    borderRight: '1px solid black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: fade('#212121', 0.325),
    }
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
  }
}));

export default function Notfound(props) {
  const url = 'http://www.kimoxscripts.com/server/'
  const classes = useStyles();
  const [scripts, setScripts] = useState([])
  const [clicked, setClicked] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [openError, setOpenError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [script, setScript] = useState('')
  const [char, setChar] = useState('')

  var headers = {
    'Content-Type': 'application/json',
    'Authorization': props.token
  }

  const closeSuccessSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  const closeErrorSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  function getOtcScripts() {
    axios.get(`${url}getOtcScripts`, { headers: headers })
      .then(function (response) {
        const scripts = response.data.data
        setScripts(scripts)
        setScript(scripts[0])
        setClicked(true)
      })
      .catch(function (error) {
        setErrorMsg(error.message)
        setOpenError(true)
      });
  }

  function updateScript() {
    axios.post(url + `updateOtcUsers`, script, { headers: headers })
      .then(function (response) {
        setSuccessMsg(response.data.message)
        setOpenSuccess(true)
        getOtcScripts();
      })
      .catch(function (error) {
        setErrorMsg(error.message)
        setOpenError(true)
      })
  }

  let handleDelete = (user) => {
    let newArr = [...script.users]
    let object = { _id: script._id, scriptname: script.scriptname, users: newArr }
    if (script.users.find(u => u === user)) {
      newArr.pop(user)
    } else {
      setErrorMsg('User not found')
      setOpenError(true)
    }
    setScript(object)
  };

  let handleUsers = () => {
    let newArr = [...script.users]
    let object = { _id: script._id, scriptname: script.scriptname, users: newArr }
    const name = char.toLowerCase().replace(/ /g, '')
    if (!script.users.find(u => u === name) && char) {
      newArr.push(name)
    } else {
      setErrorMsg('User already exist or invalid char name')
      setOpenError(true)
    }
    setScript(object)
  };

  useEffect(() => {
    getOtcScripts();
  }, [props.token]);

  return (
    <div >
      <form className={classes.root} noValidate autoComplete="off">
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={4} md={4}>
            <Scrollbars style={{ width: 200, height: 300 }}>
              {scripts && scripts.map((script, index) => (
                <div onClick={() => {
                  setClicked(true)
                  setScript(script)
                }} key={index} className={classes.scrollTab}>
                  <p>{script.scriptname}</p>
                </div>
              ))}
            </Scrollbars>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            {clicked &&
              <h3>{script.scriptname}</h3>
            }
            <Grid
              container
              justify="center"
              alignItems="center">
              <Grid item xs={12} sm={4} md={4}>
                <Input className={classes.input} placeholder="CharName" onChange={e => setChar(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Button className={classes.button} onClick={() => { handleUsers() }} variant="contained">Add</Button>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Button className={classes.button} onClick={() => { updateScript() }} variant="contained">Update</Button>
              </Grid>
            </Grid>
            {script.users && script.users.length > 0 ?
              script.users.map((user, index) => (
                <Chip
                  className={classes.chip}
                  key={index}
                  label={user}
                  onDelete={() => { handleDelete(user) }}
                />
              ))
              : <p>No users found</p>}
          </Grid>
          <Snackbar open={openSuccess} autoHideDuration={2000} onClose={closeSuccessSnack}>
            <Alert onClose={closeSuccessSnack} severity="success">
              {successMsg}
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={2000} onClose={closeErrorSnack}>
            <Alert onClose={closeErrorSnack} severity="error">
              {errorMsg}
            </Alert>
          </Snackbar>
        </Grid>
      </form>
    </div>
  );
}

