import React, { useState, useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Chip from '@material-ui/core/Chip';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ReactPlayer from 'react-player'

const modalStyle = {
  overlay: {

  },
  modal: {
    backgroundColor: fade("#212121", 0.725),
    color: "white",
    borderRadius: '10px',
  },
}

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
  },
  card: {
    cursor: 'pointer',
    background: fade("#212121", 0.125),
    '&:hover': {
      backgroundColor: fade('#212121', 0.325),
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  Coins: {
    width: 15,
    height: 15,
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 30,
      height: 30,
    },
  },
  CoinsDisplay: {
    width: 25,
    height: 25,
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 40,
      height: 40,
    },
  },
  CoinsTextDisplay: {
    fontSize: 18,
    color: "#212121",
  },
  Logo: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: 60,
      height: 60,
    },
  },
  displayImg: {
    width: 230,
    height: 230,
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: 940,
      height: 580,
    },
  },
  cardTitle: {
    fontSize: 15,
    color: "#212121",
    display: 'flex',
    fontWeight: "bold",
  },
  cardSubTitle: {
    fontSize: 14,
    color: "#212121",
  },
  displayTitle: {
    fontSize: 25,
    color: "#212121",
    fontWeight: "bold",
  },
  firstBack: {
    fontWeight: 'bold'
  },
  secondBack: {
    fontWeight: 'bold',
    padding: '5px',
    borderRadius: '0.5rem',
    backgroundColor: fade('#212121', 0.075)
  },
  chip: {
    cursor: 'pointer',
    margin: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: fade('#212121', 0.325),
    }
  },
  vid: {
    display: 'block',
    margin: '0 auto'
  }
}));

export default function Products(props) {
  const XP = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/xp.png'
  const PVP = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/Pvp.gif'
  const CC = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/cc.png'
  const TibiaCoins = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/Tibia_Coins.gif'
  const classes = useStyles();
  const [chosen, setChosen] = useState({})
  const [clicked, setClicked] = useState(false)
  const [modal, setModal] = useState('')
  const [products, setProducts] = useState([])

  function updateProducts() {
    let newArr = [];
    props.products.map(s => {
      if (s.voc == props.voc && s.bot == props.type) {
        newArr.push(s);
      }
    })
    setProducts(newArr);
  }

  useEffect(() => {
    updateProducts();
  }, [props.products]);


  function handleModal(action) {
    setModal(action)
  }

  function currentView() {
    if (!clicked) {
      return (
        <div className={classes.main}>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid container justify="center" alignItems="center">
              <Alert className={classes.Alert} severity="info">
                For more information on how to make a purchase please click on the
                desired script!
              </Alert>
            </Grid>
            {products.map((value, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card onClick={() => {
                  setChosen(products[index])
                  setClicked(true)
                }} className={classes.card}>
                  <CardHeader
                    avatar={
                      value.type === "exp" ? (
                        <img className={classes.Logo} src={XP} alt="XP" />
                      ) : value.type === "pvp" ? (
                        <img className={classes.Logo} src={PVP} alt="PVP" />
                      ) : (
                            <img className={classes.Logo} src={CC} alt="CC" />
                          )
                    }
                    title={
                      <Grid container justify="flex-start" alignItems="flex-start">
                        <Typography
                          className={classes.cardTitle}
                          variant="body1"
                          color="textSecondary"
                          component="span"
                        >
                          {`[${value.name}]`}
                        </Typography>
                      </Grid>
                    }
                    subheader={
                      <Grid container justify="flex-start" alignItems="flex-start">
                        <Typography
                          className={classes.cardSubTitle}
                          variant="body2"
                          color="textSecondary"
                          component="span"
                        >
                          {value.price}
                          <img
                            className={classes.Coins}
                            src={TibiaCoins}
                            alt="Coins"
                          />
                        </Typography>
                      </Grid>
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    image={value.img}
                    src="Script Image"
                    title={value.name}
                  />
                  <CardContent>
                    {value.stats.split(",").map((text, index) => (
                      <Grid
                        container
                        key={index}
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                        <ul>
                          <li>{text}</li>
                        </ul>
                      </Grid>
                    ))}
                  </CardContent>
                </Card>
              </Grid>))}
          </Grid>
        </div>
      )
    }
    else {

      return (
        <div className={classes.main}>

          <Grid
            container
            spacing={4}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={3} md={3}>
              <Chip
                onClick={() => {
                  setChosen({})
                  setClicked(false)
                }}
                size={'medium'}
                label={'Back'}
                className={classes.chip}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} justify="center"
              alignItems="center">
              <Typography
                className={classes.displayTitle}
                variant="body1"
                color="textSecondary"
                component="span"
              >
                {chosen.type === "exp" ? (
                  <img className={classes.Logo} src={XP} alt="XP" />
                ) : chosen.type === "pvp" ? (
                  <img className={classes.Logo} src={PVP} alt="PVP" />
                ) : (
                      <img className={classes.Logo} src={CC} alt="CC" />
                    )}
                {`[${chosen.name}]`}
                {chosen.type === "exp" ? (
                  <img className={classes.Logo} src={XP} alt="Logo" />
                ) : chosen.type === "pvp" ? (
                  <img className={classes.Logo} src={PVP} alt="Logo" />
                ) : (
                      <img className={classes.Logo} src={CC} alt="Logo" />
                    )}
              </Typography>
            </Grid >
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                className={classes.CoinsTextDisplay}
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {chosen.price}
                <img
                  className={classes.CoinsDisplay}
                  src={TibiaCoins}
                  alt="Coins"
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Chip
                onClick={() => handleModal(true)}
                label="BUY SCRIPT"
                clickable
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {chosen.info.split(",").map((text, index) => (
                  <Grid
                    container
                    key={index}
                    justify="center"
                    alignItems="center"
                  >
                    <ul className={index % 2 ? classes.firstBack : classes.secondBack}>
                      <li>{text}</li>
                    </ul>
                  </Grid>
                ))}
              </Typography>
            </Grid>
            {chosen.setupImg &&
              <Grid item xs={12} sm={12} md={12}>
                <img
                  src={chosen.setupImg}
                  alt="Setup"
                />
              </Grid>}
            {chosen.vid &&
              <div className={classes.vid}>
                <Grid item xs={12} sm={12} md={12}>
                  <ReactPlayer controls={true} url={chosen.vid} />
                </Grid>
              </div>
            }
            <Grid item xs={12} sm={12} md={12}>
              <img
                className={classes.displayImg}
                src={chosen.img}
                alt="DP"
              />
            </Grid>
          </Grid >
        </div>
      )
    }
  }

  return (
    <div>
      <Modal open={modal} styles={modalStyle} onClose={() => handleModal(false)} center>

        <Grid
          container
          spacing={4}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12} md={12}>
            <h4>How to buy this script #ALL PRICES ARE IN EZODUS COINS#</h4>
            <h4>#MY ONLY EZODUS CHAR IS "BAMBOZO"#</h4>
            <h4>Choose only one way to buy the script from below</h4>
          </Grid >
          <Grid item xs={12} sm={12} md={12}>
            <p>Send coins to <span style={{ fontWeight: 'bold' }}>"bambozo" </span> then send a letter with script name + your email from the same character coins sent from.<span style={{ color: 'green', fontWeight: 'bold' }}>--FASTEST WAY</span></p>
            <p>Add me on discord (Karimm#2447)</p>
            <p>Message me on ezodus.net (Bambozo)</p>
          </Grid >

        </Grid >
      </Modal>
      {currentView()}
    </div>
  )

}
