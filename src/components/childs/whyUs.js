import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const useStyles = makeStyles((theme) => ({
  whyUs: {
    margin: theme.spacing(1),
    width: 330,
    height: 300,
    [theme.breakpoints.up("sm")]: {
      width: 850,
      height: 480,
    },
  },
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
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: '17px',
      padding: '5px',
      fontWeight: 'bold',
      borderRadius: '0.5rem',
      margin: theme.spacing(1),
    },
  },
}));

export default function WhyUs() {
  const EasyConfig = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/config_new.png'
  const LowPots = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/lowPots.png'
  const PzWait = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/pzWait.png'
  const Authentication = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/authentication.png'
  const DiscordBot = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/discordBot.png'
  const classes = useStyles();
  const slides = [
    {
      desc: `Powerfull discord bot ready to serve you 24/7, So you can easily access your scripts from any device, Also will announce all scripts updates so you're always using the latest script with latest fixes.`,
      img: DiscordBot
    },
    {
      desc: `OTC scripts are character binded, Only registered characters are allowed to use the script others get xlogged instantly, This allows us to contain script theft and give you the best botting experience.`,
      img: Authentication
    },
    {
      desc: `Easy to configure scripts packed with alot of features.`,
      img: EasyConfig
    },
    {
      desc: `We took care of every little detail.`,
      img: PzWait
    },
    {
      desc: `Smart and efficient hunting sessions, good with rapid respawn events.`,
      img: LowPots
    },
  ]

  return (
    <CarouselProvider
      naturalSlideWidth={340}
      naturalSlideHeight={335}
      totalSlides={3}
      interval={100000}
      isPlaying={true}
      totalSlides={5}
    >
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
      <Slider>
        {slides && slides.map((slide, index) => (
          <Slide key={index} index={index}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                className={classes.Title}
              >
                {slide.desc}
              </Typography>
            </Grid>
            <img className={classes.whyUs} src={slide.img} alt="SlideImg" />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
}

