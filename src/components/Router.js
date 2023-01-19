import React from 'react';
import NotFound from './NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './auth/Signup';
import Restaurant from './Restaurant';
import { Component } from 'react';
import { auth } from '../firebase';
import Login from './auth/Login';
import Home from './Home';
import Cart from './Cart';
import axios from 'axios';
import Address from './Address';
import Checkout from './Checkout';
import Header from './Header';
import Headers from './Headers';
import Order from './Order';

class Router extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: '',
      user: {},
      restaurant_id: '',
      address_id: '',
      cartItems: localStorage.getItem('cartItem')
        ? JSON.parse(localStorage.getItem('cartItem'))
        : [],
      total: 0,
      count: localStorage.getItem('cartItem')
        ? JSON.parse(localStorage.getItem('cartItem')).length
        : 0,
    };
  }
  setusersignup(userr) {
    console.log(userr, 'hey dear i am there');
    this.setState({ user: userr });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        localStorage.clear();
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN' });
        this.setState({ cartItems: [], total: 0, count: 0, user: {} });
      }
      if (user) {
        this.setState({ loggedInStatus: 'LOGGED_IN' });
        let email = user.email;
        console.log(user);
        axios
          .get(
            `https://burgerblast-pern-production.up.railway.app/api/v1/users/${email}`,
            {}
          )
          .then((res) => {
            this.setState({ user: res.data });
          })
          .catch((error) => console.log(error));
      }
    });
  }
  clearcartandcounter = () => {
    this.setState({ cartItems: [], count: 0 });
  };
  addtoCart = (burger) => {
    this.setState({ total: this.state.total + burger.price });
    let items = this.state.cartItems;
    let alreadyInCart = false;
    items.forEach((item) => {
      if (item.name === burger.name && item.restaurant === burger.restaurant) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      items.push({ ...burger, count: 1 });
      this.setState({ count: this.state.cartItems.length + 0 });
    }
    localStorage.setItem('cartItem', JSON.stringify(items));
  };

  deleteitem = (burger) => {
    console.log('......');
    const items = this.state.cartItems.slice();
    this.setState({
      cartItems: items.filter(
        (x) => x.name !== burger.name || x.restaurant !== burger.restaurant
      ),
      total: 0,
      count: this.state.count - 1,
    });
    localStorage.setItem(
      'cartItem',
      JSON.stringify(items.filter((x) => x.name !== burger.name))
    );
  };

  increase = (burgers) => {
    let items = this.state.cartItems;
    items.forEach((item) => {
      if (
        item.name === burgers.name &&
        item.restaurant === burgers.restaurant
      ) {
        item.count++;
      }
    });
    localStorage.setItem('cartItem', JSON.stringify(items));
    this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItem')) });
  };
  decrease = (burgers) => {
    let items = this.state.cartItems;
    items.forEach((item) => {
      if (
        item.name === burgers.name &&
        item.restaurant === burgers.restaurant
      ) {
        if (item.count > 0) {
          item.count--;
        }
      }
    });
    localStorage.setItem('cartItem', JSON.stringify(items));
    this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItem')) });
  };
  render() {
    <Headers />;
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
                user={this.state.user}
                count={this.state.count}
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
                count={this.state.count}
                setusersignup={(userr) => this.setusersignup(userr)}
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
                restaurant_id={this.state.restaurant_id}
                count={this.state.count}
              />
            )}
          />
          <Route
            exact
            path="/restaurant/:restaurantURL"
            render={(props) => (
              <Home
                {...props}
                user={this.state.user}
                addtoCart={this.addtoCart}
                count={this.state.count}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />

          <Route
            path="/restaurants/cart"
            render={(props) => (
              <Cart
                {...props}
                user={this.state.user}
                cartItems={this.state.cartItems}
                total={this.state.total}
                count={this.state.count}
                deleteitem={this.deleteitem}
                loggedInStatus={this.state.loggedInStatus}
                increase={this.increase}
                decrease={this.decrease}
              />
            )}
          />

          <Route
            path="/address"
            render={(props) => (
              <Address
                {...props}
                user={this.state.user}
                cartItems={this.state.cartItems}
                total={this.state.total}
                count={this.state.count}
                deleteitem={this.deleteitem}
                loggedInStatus={this.state.loggedInStatus}
                increase={this.increase}
                decrease={this.decrease}
                address_id={this.state.address_id}
              />
            )}
          />
          <Route
            path="/cart/checkout"
            render={(props) => (
              <Checkout
                {...props}
                user={this.state.user}
                cartItems={this.state.cartItems}
                total={this.state.total}
                count={this.state.count}
                deleteitem={this.deleteitem}
                loggedInStatus={this.state.loggedInStatus}
                increase={this.increase}
                decrease={this.decrease}
                clear={this.clearcartandcounter}
              />
            )}
          />
          <Route
            path="/orders"
            render={(props) => (
              <Order
                {...props}
                user={this.state.user}
                cartItems={this.state.cartItems}
                total={this.state.total}
                count={this.state.count}
                deleteitem={this.deleteitem}
                loggedInStatus={this.state.loggedInStatus}
                increase={this.increase}
                decrease={this.decrease}
                clear={this.clearcartandcounter}
              />
            )}
          />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
