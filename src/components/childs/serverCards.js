import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 355,
    margin: theme.spacing(3),
  },
  media: {
    height: 100,
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
  const Gunzo = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/gunzo.png'
  const Ezodus = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/ezodus.png'
  const Aurera = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/aurera.png'
  const Kivera = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/kivera.png'
  const servers = [
    {
      name: 'Gunzodus',
      info: 'Client: 10.00-12.50+, Map: Global/Real Map',
      img: Gunzo,
      link: 'https://www.gunzodus.net'
    },
    {
      name: 'Ezodus',
      info: 'Client: 10.00-12.50+, Map: Global/Real Map',
      img: Ezodus,
      link: 'https://www.ezodus.net'
    },
    {
      name: 'Kivera Global',
      info: 'Client: 10.00-12.50+, Map: Global/Real Map',
      img: Kivera,
      link: 'https://server.kivera-global.net/'
    },
    {
      name: 'Aurera Global',
      info: 'Client: 10.00-12.50+, Map: Global/Real Map',
      img: Aurera,
      link: 'https://www.aurera-global.com/'
    },
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
            Servers guaranteed to work with our scripts
            </Typography>
        </Grid>
        {
          servers.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={value.img}
                    title={value.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {value.name}
                    </Typography>
                    {value.info.split(",").map((text, index) => (
                      <Grid
                        container
                        key={index}
                        justify="center"
                        alignItems="center"
                      >
                        <ul className={index % 2 ? classes.firstBack : classes.secondBack}>
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

                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid
                    container
                    key={index}
                    justify="center"
                    alignItems="center"
                  >
                    <a target="_blank" rel="noopener noreferrer" href={value.link}>
                      <Button size="small" color="secondary">
                        Take me there
                        </Button>
                    </a>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

