import React, { Component } from "react";
import "./App.css";
import FileToBase64 from "./FileToBase64";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FileToBase64 />
      </div>
    );
  }
}

export default App;
