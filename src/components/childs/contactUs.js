import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  Logo: {
    maxWidth: 355,
    maxHeight: 155,
  },
  discordFirst: {
    padding: '3px',
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    display: 'flex',
    fontSize: '20px',
    backgroundColor: fade('#229922', 0.095),
    textAlignLast: 'justify'
  },
  discordSecond: {
    padding: '3px',
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    display: 'flex',
    fontSize: '20px',
    backgroundColor: fade('#7289d9', 0.195),
    textAlign: 'jutify'
  },
  gmailFirst: {
    padding: '3px',
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    display: 'flex',
    fontSize: '20px',
    backgroundColor: fade('#229922', 0.095),
    textAlignLast: 'justify'
  },
  gmailSecond: {
    padding: '3px',
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    display: 'flex',
    fontSize: '20px',
    backgroundColor: fade('#FF0000', 0.095),
    textAlign: 'jutify'
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
  const Discord = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/discord.png'
  const Gmail = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/gmail.png'
  const contact = [
    {
      name: "Discord",
      info: "Add me on discord [Karimm#2447], Fastest way for contact, Replies within 5-10 minutes, THIS IS MY ONLY ACCOUNT ON DISCORD.",
      img: Discord
    },
    {
      name: "Gmail",
      info: "Contact me on gmail if you prefer mailing [kimoxscripts@gmail.com]., Replies within 10-20 minutes, THIS IS MY ONLY EMAIL",
      img: Gmail
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
            Contact us only with ways below
            </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>

          {contact[0].info.split(",").map((text, index) => (
            <Grid
              container
              key={index}
              justify="flex-end"
              alignItems="flex-end"
            >
              <ul className={index % 2 ? classes.discordFirst : classes.discordSecond}>
                <li>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >{text}
                  </Typography>
                </li>
              </ul>

            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <img className={classes.Logo} src={Discord} alt="Discord" />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <img className={classes.Logo} src={Gmail} alt="Gmail" />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>

          {contact[1].info.split(",").map((text, index) => (
            <Grid
              container
              key={index}
              justify="flex-start"
              alignItems="flex-start"
            >
              <ul className={index % 2 ? classes.gmailFirst : classes.gmailSecond}>
                <li>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >{text}
                  </Typography>
                </li>
              </ul>

            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

