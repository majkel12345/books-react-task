import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BooksList from "./components/BooksList";
import Cart from "./components/Cart";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <BooksList />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="*">
            <BooksList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
