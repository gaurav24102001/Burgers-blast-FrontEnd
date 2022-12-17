import React from 'react';
import App from './App';
import NotFound from './NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './auth/Signup';
import Restaurant from './Restaurant';
import { Component } from 'react';
import { auth } from '../firebase';
import { Redirect } from 'react-router-dom';
import Login from './auth/Login';

class Router extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: '',
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data,
    });
    

  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN' });
      }
      if (user) {
        this.setState({ loggedInStatus: 'LOGGED_IN' });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route
            exact
            path="/restaurant"
            render={(props) => (
              <Restaurant
                {...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
                name={this.state.user}
              />
            )}
          />
          <Route
            path="/restaurant/:restaurantId"
            render={(props) => <App {...props} user={this.state.user} />}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
