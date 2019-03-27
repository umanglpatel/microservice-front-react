import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Drawer from './containers/Drawer/Drawer';

import './App.css';
import Login from './containers/Login/Login';
import User from './containers/User/User';
import Product from './containers/Product/Product';
import Order from './containers/Order/Order';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawer>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/user" exact component={User} />
            <Route path="/product" exact component={Product} />
            <Route path="/order" exact component={Order} />
            <Route path="/" exact component={Login} />
          </Switch>
        </Drawer>
      </div>
    );
  }
}

export default App;
