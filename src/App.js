import React from "react";
import MainNav from "./components/mainNav";
import Links from "./components/links";


class App extends React.Component {
  render() {
    console.log(this.props.location)
    return (
      <div className="App">
        <Links />
        {this.props.location.pathname === '/' && <MainNav />}
      </div>
    );
  }
}

export default App;
