import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/martel.ttf";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Main from "./App";
import Others from "./components/otherPages";
import NotFound from "./components/notFound";
import Admin from "./components/admin";

import {
  fade,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: { main: fade("#212121", 0.825), contrastText: "#fff" },
    secondary: { main: "#3f51b5", contrastText: "#fff" },
  },
});


function App({ location }) {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route location={location} path="/" exact component={Main} />
        <Route location={location} path={`/other/:topic`} exact component={Others} />
        <Route location={location} path={`/3yt4jwe8`} exact component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
