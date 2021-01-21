import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  firstPP: {
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    fontSize: '20px',
  },
  secondPP: {
    borderRadius: '0.5rem',
    margin: theme.spacing(2),
    fontSize: '20px',
    backgroundColor: fade('#212121', 0.095),
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
  const pp = "Your privacy is important to us. It is Kimox Scripts' policy to respect your privacy regarding any information we may collect from you across our website, http://www.kimoxscripts.com, and other sites we own and operate.! We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.! We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.! We don’t share any personally identifying information publicly or with third-parties, except when required to by law.! Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.! You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.! Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.! This policy is effective as of 31 December 2020."
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
            Privacy Policy
            </Typography>
        </Grid>
        {pp.split("!").map((text, index) => (
          <Grid
            container
            key={index}
            justify="center"
            alignItems="center"
          >
            <ul className={index % 2 ? classes.firstPP : classes.secondPP}>
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
    </div>
  );
}

