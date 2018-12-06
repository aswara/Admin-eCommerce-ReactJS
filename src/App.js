import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Loading from './components/Loading'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Orders from './components/Orders'
import Products from './components/Products'
import Customers from './components/Customers'
import Categories from './components/Categories'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Loading} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/orders" component={Orders} />
            <Route path="/products" component={Products} />
            <Route path="/customers" component={Customers} />
            <Route path="/categories" component={Categories} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
