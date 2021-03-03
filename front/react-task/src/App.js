import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Books from "./Books";
import Cart from "./Cart";
import Form from "./Form";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Books />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
