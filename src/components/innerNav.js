import React from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Cards from "../components/displayScripts";
import Grid from "@material-ui/core/Grid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  Tab: {
    flexGrow: 1,
    display: 'flex',
  },
  Logo: {
    width: 40,
    height: 40,
    [theme.breakpoints.up("sm")]: {
      width: 80,
      height: 80,
    },
  },
}));

export default function InnerNav(props) {
  const Sorceress = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/Sorceress.png'
  const Knight = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/Knight.png'
  const Paladin = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/Paladin.png'
  const Druid = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/Druid.png'
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function ActiveNav() {
    const { val, products } = props;
    switch (val) {
      case 'xeno':
        return (
          <div className={classes.root}>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={classes.tabs}
              >
                <Tab label="Sorcerer" icon={<img className={classes.Logo} src={Sorceress} alt="Logo" />} {...a11yProps(0)} />
                <Tab label="Druid" icon={<img className={classes.Logo} src={Druid} alt="Logo" />} {...a11yProps(1)} />
                <Tab label="Knight" icon={<img className={classes.Logo} src={Knight} alt="Logo" />} {...a11yProps(2)} />
                <Tab label="Paladin" icon={<img className={classes.Logo} src={Paladin} alt="Logo" />} {...a11yProps(3)} />
              </Tabs>
            </Grid>
            <TabPanel value={value} index={0}>
              <Cards type={val} voc={'ms'} products={products} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Cards type={val} voc={'ed'} products={products} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Cards type={val} voc={'ek'} products={products} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Cards type={val} voc={'rp'} products={products} />
            </TabPanel>
          </div>
        )
      case 'otc':
        return (
          <div className={classes.root}>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={classes.tabs}
              >
                <Tab label="Sorcerer" icon={<img className={classes.Logo} src={Sorceress} alt="Logo" />} {...a11yProps(0)} />
                <Tab label="Druid" icon={<img className={classes.Logo} src={Druid} alt="Logo" />} {...a11yProps(1)} />
                <Tab label="Knight" icon={<img className={classes.Logo} src={Knight} alt="Logo" />} {...a11yProps(2)} />
                <Tab label="Paladin" icon={<img className={classes.Logo} src={Paladin} alt="Logo" />} {...a11yProps(3)} />
              </Tabs>
            </Grid>
            <TabPanel value={value} index={0}>
              <Cards type={val} voc={'ms'} products={products} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Cards type={val} voc={'ed'} products={products} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Cards type={val} voc={'ek'} products={products} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Cards type={val} voc={'rp'} products={products} />
            </TabPanel>
          </div>
        )
      default:
        break;
    }
  }

  return (
    <div>
      {ActiveNav()}
    </div>
  );
}
