import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Rotworm from "../imgs/rotworm.gif";
import Orc from "../imgs/orc.gif";
import Dragon from "../imgs/dragon.gif";
import Mummy from "../imgs/mummy.gif";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 80,
  },
  Logo: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 60,
      height: 60,
      marginRight: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },
  title: {
    flexGrow: 1,
    fontSize: 39,
    display: "block",
    fontFamily: "martel",
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const monsters = [Rotworm, Mummy, Dragon, Orc]
  const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            <img className={classes.Logo} src={randomMonster} alt="Logo" />
            <Link to={"/"} style={{ textDecoration: "none", color: 'yellow' }}>
              Kimox Scripts
            </Link>
            <img className={classes.Logo} src={randomMonster} alt="Logo" />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
