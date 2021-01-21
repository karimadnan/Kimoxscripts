import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Links from "./links";
import {
  useParams,
} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import { Link } from "react-router-dom";
import WhyUs from './childs/whyUs';
import PrivacyPolicy from './childs/PrivacyPolicy';
import ContactUs from './childs/contactUs';
import Faq from './childs/faq';
import ServerCards from './childs/serverCards';
import NotFound from './notFound';

const useStyles = makeStyles((theme) => ({
  chip: {
    cursor: 'pointer',
    marginBottom: theme.spacing(1.5),
    '&:hover': {
      backgroundColor: fade('#212121', 0.325),
    }
  },
  Title: {
    fontSize: '10px',
    padding: '5px',
    fontWeight: 'bold',
    borderRadius: '0.5rem',
    backgroundColor: fade('#212121', 0.075),
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: '17px',
      padding: '5px',
      fontWeight: 'bold',
      borderRadius: '0.5rem',
      backgroundColor: fade('#212121', 0.075),
      margin: theme.spacing(1),
    },
  }
}));

export default function OtherPages() {
  const classes = useStyles();
  let { topic } = useParams();

  function currentPage(topic) {
    switch (topic) {
      case 'Servers':
        return (
          <ServerCards />
        )
      case 'FAQ':
        return (
          <Faq />
        )
      case 'Contact':
        return (
          <ContactUs />
        )
      case 'Privacypolicy':
        return (
          <PrivacyPolicy />
        )
      case 'WhyUs':
        return (
          <WhyUs />
        )
      default:
        return (
          <NotFound />
        )
        break;
    }
  }

  return (
    <div className={classes.root}>
      <Links />
      <Grid item xs={12} sm={12} md={12}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Chip
            size={'medium'}
            label={'Back to main page'}
            className={classes.chip}
          />
        </Link>
      </Grid>
      {currentPage(topic)}
    </div>
  );
}