import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Drawer from './containers/Drawer/Drawer';
import { connect } from 'react-redux';

import './App.css';
import Login from './containers/Login/Login';
import User from './containers/User/User';
import Product from './containers/Product/Product';
import Order from './containers/Order/Order';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/users" component={User} />
          <Route path="/products" component={Product} />
          <Route path="/orders" component={Order} />
          <Route path="/" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Drawer>
          <Switch>
            {routes}
            {/* <Route path="/login" exact component={Login} />
            <Route path="/users" exact component={User} />
            <Route path="/products" exact component={Product} />
            <Route path="/orders" exact component={Order} />
            <Route path="/" exact component={Login} /> */}
          </Switch>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: localStorage.getItem('token') !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
