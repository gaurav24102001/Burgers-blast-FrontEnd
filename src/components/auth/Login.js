import React, { Component } from 'react';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Headers from '../Headers';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      loginErrors: '',
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        this.props.history.push('/restaurant');
      })
      .catch((error) => {
        this.setState({ loginErrors: error.message });
        console.log('error...', this.state.loginErrors);
      });
    event.preventDefault();
  }
  handleLogoutClick() {
    auth.signOut().then(
      function () {
        alert('you were successfully logged out');
      },
      function (error) {
        console.error('Sign Out Error', error);
      }
    );
  }

  render() {
    let disa = false;
    this.props.loggedInStatus === 'LOGGED_IN' ? (disa = true) : (disa = false);
    return (
      <div>
        <Headers
          login={this.props.loggedInStatus}
          count={this.props.count}
          history={this.props.history}
        />
        <body className="login">
          <div class="box-form">
            <div class="left">
              <div class="overlay">
                <h1>Hello World.</h1>
                <p>
                  This is burger Ordering App.<br></br> <br></br> We provide an
                  ease online method to orders your favourite burger from
                  different restaurant.
                </p>
              </div>
            </div>

            <div class="right" Style="min-width:30%">
              <h5>Login</h5>
              {this.props.loggedInStatus === 'LOGGED_IN' ? (
                <h2>{this.props.user.name} is logged in </h2>
              ) : (
                <p>
                  Don't have an account?Please Create a
                  <a href="/signup"> New Account</a> it takes less than a minute{' '}
                </p>
              )}

              <div class="inputs">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={(event) => this.handleChange(event)}
                  disabled={disa}
                />
                <br />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={(event) => this.handleChange(event)}
                  disabled={disa}
                />
              </div>

              <div Style="color:red">
                {this.state.loginErrors}
                <br />
                <br />
              </div>

              <div class="remember-me--forget-password">
                <span className="logins">
                  <label>
                    <input type="checkbox" name="item" value="checked" />
                    <span class="text-checkbox">Remember me</span>
                  </label>
                </span>
              </div>

              <br />
              {this.props.loggedInStatus === 'LOGGED_IN' ? (
                <button className="login" Style="cursor: not-allowed;">
                  Login
                </button>
              ) : (
                <button
                  className="login "
                  onClick={(event) => this.handleSubmit(event)}
                  Style="cursor:pointer"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </body>
        <div Style="background-color:Black ;padding:10px ; color:white; text-align:center">
          All right Reserved
        </div>
      </div>
    );
  }
}
