import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './components/Home'
import Loading from './components/Loading'
import Login from './components/Login'
const Dashboard = lazy(() => import('./components/Dashboard'))
const Orders = lazy(() => import('./components/Orders'))
const Products = lazy(() => import('./components/Products'))
const Customers = lazy(() => import('./components/Customers'))
const Categories = lazy(() => import('./components/Categories'))
const AddProduct = lazy(() => import('./components/Product/AddProduct'))
const Product = lazy(() => import('./components/Product'))
const UpdateProduct = lazy(() => import('./components/Product/Update'))

class App extends Component {
  componentWillMount() {
    const element = document.getElementById('startingLoader')
    window.onload = () => {
      if(element) {
        element.remove()
      }
    }
  }

  render() {
    const { user } = this.props
    return (
        <BrowserRouter>
        <Suspense fallback={Loading}>
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
        </Suspense>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return({
      user: state.userReducer
  })
}

export default connect(mapStateToProps)(App);
