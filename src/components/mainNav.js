import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InnerNav from "../components/innerNav";
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
      maxHeight: 125,
    },
  },
  Alert: {
    margin: theme.spacing(2),
  },
  Logo: {
    width: 50,
    height: 50,
    [theme.breakpoints.up("sm")]: {
      width: 80,
      height: 80,
    },
  },
}));


export default function ScrollableTabsButtonForce() {

  const Xeno = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/xeno.png'
  const OTC = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/otc.png'
  const TFS = 'https://kimoxscripts.s3.eu-central-1.amazonaws.com/tfs.png'
  const classes = useStyles();
  const url = 'http://www.kimoxscripts.com/server/'
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getProducts() {
    axios.get(`${url}getProducts`)
      .then(function (response) {
        setProducts(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  useEffect(() => {
    getProducts()
  }, [url]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          className={classes.title}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="OTC-V8"
            icon={<img className={classes.Logo} src={OTC} alt="Logo" />}
            {...a11yProps(0)}
          />
          <Tab
            label="Xenobot"
            icon={<img className={classes.Logo} src={Xeno} alt="Logo" />}
            {...a11yProps(1)}
          />
          <Tab
            label="TFS"
            icon={<img className={classes.Logo} src={TFS} alt="Logo" />}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <InnerNav val={'otc'} products={products} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InnerNav val={'xeno'} products={products} />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      </TabPanel> */}
    </div>
  );
}
