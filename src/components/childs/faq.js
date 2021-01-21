import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  question: {
    padding: '3px',
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    display: 'flex',
    fontSize: '20px',
    backgroundColor: fade('#FF1133', 0.095)
  },
  answer: {
    padding: '3px',
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    display: 'flex',
    fontSize: '18px',
    backgroundColor: fade('#229922', 0.095)
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
  },
}));

export default function WhyUs() {
  const faq = [
    {
      question: `I paid for a script now what?`,
      answer: `If you're in our discord server, The bot will instantly send you a private message for further assistance on how you can get the script files.`
    },
    {
      question: `Can i make a custom script request with custom features?`,
      answer: `Yes, if you want a script which is not listed you can simply contact us for a custom request.`
    },
    {
      question: `Do i get support/help after i purchase a script?`,
      answer: `Definitely!, You'll get full support until you're familiar with how the script and how it works.`
    }
  ]
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={12}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="span"
            className={classes.Title}
          >
            Frequently Asked Questions
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {
            faq.map((value, index) => (
              <div id={index}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                    className={classes.question}
                  >
                    • {value.question}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                    className={classes.answer}
                  >
                    {value.answer}
                  </Typography>
                </Grid>
              </div>
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

