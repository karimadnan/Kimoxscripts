import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { makeStyles, fade } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import { Scrollbars } from 'react-custom-scrollbars';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  upload: {
    display: 'none'
  },
  upButton: {
    padding: '3px',
    cursor: 'pointer',
    background: fade("#212121", 0.125),
    borderRadius: '0.5rem'
  },
  scrollTab: {
    background: fade("#212121", 0.125),
    borderRight: '1px solid black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: fade('#212121', 0.325),
    }
  },
}));

export default function Notfound(props) {
  const url = 'http://192.168.1.2:4000/server/'
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [scriptName, setScriptName] = useState('')
  const [scriptPrice, setScriptPrice] = useState('')
  const [scriptType, setScriptType] = useState('exp')
  const [scriptDP, setScriptDP] = useState('')
  const [scriptInfo, setScriptInfo] = useState('')
  const [scriptSetup, setScriptSetup] = useState('')
  const [scriptBot, setScriptBot] = useState('xeno')
  const [scriptVoc, setScriptVoc] = useState('ms')
  const [scriptVid, setScriptVid] = useState('')
  const [scriptStats, setScriptStats] = useState('')
  const [roleColor, setRoleColor] = useState('')
  const [insertScript, setInsertScript] = useState(false)
  const [uploadFile, setUploadFile] = useState(false)
  const [products, setProducts] = React.useState([])
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [openError, setOpenError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  function getProducts() {
    axios.get(`${url}getProducts`)
      .then(function (response) {
        setProducts(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  useEffect(() => {
    getProducts()
  }, [url]);

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

  function syncScript(s) {
    setScriptName(s.name);
    setScriptPrice(s.price);
    setScriptInfo(s.info);
    setScriptDP(s.img);
    setScriptSetup(s.setupImg);
    setScriptBot(s.bot);
    setScriptType(s.type);
    setScriptStats(s.stats);
    setScriptVoc(s.voc);
    setScriptVid(s.vid);
  }

  function uploadScript() {
    var headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': props.token
    }
    var headers2 = {
      'Content-Type': 'application/json',
      'Authorization': props.token
    }

    if (!uploadFile && !insertScript) {
      setErrorMsg('Choose one option (upload or insert).')
      setOpenError(true)
    }

    if (uploadFile) {
      if (!file) return setErrorMsg('No file selected.'), setOpenError(true)

      const formData = new FormData();
      formData.append('script', file);
      formData.append('name', file.name);

      if (file.name && roleColor) {
        axios.post(url + `uploadScript?Script=${file.name}&Color=${roleColor}`, formData, { headers: headers })
          .then(function (response) {
            setSuccessMsg(response.data.message)
            setOpenSuccess(true)
          })
          .catch(function (error) {
            setErrorMsg(error.message)
            setOpenError(true)
          })
      }
    }

    if (insertScript) {
      const obj = { scriptDName: scriptName, scriptPrice: scriptPrice, scriptType: scriptType, scriptDP: scriptDP, scriptInfo: scriptInfo, scriptSetup: scriptSetup, scriptBot: scriptBot, scriptVoc: scriptVoc, scriptStats: scriptStats, scriptVid: scriptVid }
      axios.post(url + `insertScript`, obj, { headers: headers2 })
        .then(function (response) {
          setSuccessMsg(response.data.message)
          setOpenSuccess(true)
          getProducts()
        })
        .catch(function (error) {
          setErrorMsg(error.message)
          setOpenError(true)
        })
    }
  }

  return (
    <div>
      <form noValidate autoComplete="off">
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={2} md={2}>
            <Scrollbars style={{ width: 300, height: 500 }}>
              {products && products.map((p, index) => (
                <div onClick={() => {
                  syncScript(p)
                }} key={index} className={classes.scrollTab}>
                  <p>{p.bot}-{p.voc}-{p.name}</p>
                </div>
              ))}
            </Scrollbars>
          </Grid>
          <Grid item xs={12} sm={10} md={10}>
            <Grid item xs={12} sm={12} md={12}>
              <label>
                <input type="checkbox"
                  checked={insertScript}
                  onChange={() => { setInsertScript(!insertScript) }}
                />
                  Insert to scripts
                </label>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <label>
                <input type="checkbox"
                  checked={uploadFile}
                  onChange={() => { setUploadFile(!uploadFile) }}
                />
                  Upload File
                </label>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="roleColor" value={roleColor} onChange={e => setRoleColor(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="scriptName" value={scriptName} onChange={e => setScriptName(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="scriptPrice" value={scriptPrice} onChange={e => setScriptPrice(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <select value={scriptType} onChange={e => setScriptType(e.target.value)}>
                <option value="exp">exp</option>
                <option value="pvp">pvp</option>
                <option value="money">cash</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="ImageURL" value={scriptDP} onChange={e => setScriptDP(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="VidURL" value={scriptVid} onChange={e => setScriptVid(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="scriptInfo" value={scriptInfo} onChange={e => setScriptInfo(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="setupImgURL" value={scriptSetup} onChange={e => setScriptSetup(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <select value={scriptBot} onChange={e => setScriptBot(e.target.value)}>
                <option value="xeno">xeno</option>
                <option value="otc">otc</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <select value={scriptVoc} onChange={e => setScriptVoc(e.target.value)}>
                <option value="ms">ms</option>
                <option value="ed">ed</option>
                <option value="ek">ek</option>
                <option value="rp">rp</option>
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Input placeholder="scriptStats" value={scriptStats} onChange={e => setScriptStats(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <p>file chosen: {file ? file.name : 'none'}</p>
              <p>size: {file ? bytesToSize(file.size) : 'none'}</p>
            </Grid>
            <input name={'script'} type="file" id={'file'} className={classes.upload} onChange={e => setFile(e.target.files[0])} />
            <label htmlFor="file" className={classes.upButton}>Select file</label>
            <Grid item xs={12} sm={12} md={12}>
              <Button className={classes.button} onClick={() => { uploadScript() }} variant="contained">Upload</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
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
    </div>
  );
}

