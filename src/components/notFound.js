import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import { Link } from "react-router-dom";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    cursor: 'pointer',
    margin: theme.spacing(1.5),
    '&:hover': {
      backgroundColor: fade('#212121', 0.325),
    }
  },
  Title: {
    fontSize: '29px',
    padding: '5px',
    borderRadius: '0.5rem',
    backgroundColor: fade('#212121', 0.075),
    margin: theme.spacing(1),
  },
}));

export default function Notfound() {
  const classes = useStyles();
  const Sad = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/404.png'

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={12}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Chip
              size={'medium'}
              label={'Back to main page'}
              className={classes.chip}
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="span"
            className={classes.Title}
          >
            404 Not Found
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <img src={Sad} alt="404 not found" />
        </Grid>
      </Grid>
    </div>
  );
}

