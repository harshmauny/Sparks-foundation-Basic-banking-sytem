import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import HomePage from "./components/homePage.component";
import ViewCustomers from "./components/viewCustomers.comonent";
import ViewTransactions from "./components/viewTransaction.component";
import Transfer from "./components/transfer.component";
class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <nav class="navbar sticky-top navbar-dark bg-dark">
            <div class="container-fluid">
              <a class="navbar-brand">Sparks Bank</a>
              <Link to="/"><button class="btn btn-outline-success" >Home</button></Link>
            </div>
          </nav>
        </div>
        <Route path="/" exact component={HomePage} />
        <Route path="/customers" exact component={ViewCustomers} />
        <Route path="/transactions" exact component={ViewTransactions} />
        <Route path="/transfer" exact component={Transfer} />
      </Router>
    );
  }
}

export default App;