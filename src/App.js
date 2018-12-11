import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Orders from './components/Orders'
import Products from './components/Products'
import Customers from './components/Customers'
import Categories from './components/Categories'
import AddProduct from './components/Product/AddProduct'
import Product from './components/Product'
import UpdateProduct from './components/Product/Update'

class App extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <BrowserRouter>
        {
          user.login ?
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/orders" component={Orders} />
            <Route path="/products" component={Products} />
            <Route path="/customers" component={Customers} />
            <Route path="/categories" component={Categories} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/product/:id" component={Product} />
            <Route path="/updateproduct/:id" component={UpdateProduct} />
            <Route path="/*" component={Home} />
          </Switch>
          :
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/*" component={Home} />
          </Switch>
        }
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return({
      user: state.userReducer
  })
}

export default connect(mapStateToProps)(App);
