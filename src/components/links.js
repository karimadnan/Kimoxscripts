import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(1.5),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Links() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to={"/other/WhyUs"} style={{ textDecoration: "none" }}>
        <Chip
          label="Why Us?"
          clickable
          color="primary"
        />
      </Link>
      <Link to={"/other/Servers"} style={{ textDecoration: "none" }}>
        <Chip
          label="Servers Supported"
          clickable
          color="primary"
        />
      </Link>
      <Link to={"/other/FAQ"} style={{ textDecoration: "none" }}>
        <Chip
          label="FAQ"
          clickable
          color="primary"
        />
      </Link>
      <Link to={"/other/Contact"} style={{ textDecoration: "none" }}>
        <Chip
          label="Contact Us"
          clickable
          color="primary"
        />
      </Link>
      <Link to={"/other/Privacypolicy"} style={{ textDecoration: "none" }}>
        <Chip
          label="Privacy Policy"
          clickable
          color="primary"
        />
      </Link>
    </div>
  );
}