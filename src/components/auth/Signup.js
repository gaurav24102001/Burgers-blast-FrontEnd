import React, { Component } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Headers from './../Headers';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      mobile_no: '',
      Errors: '',
      dis: 'False',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      Errors: '',
    });
  }

  handleSubmit(event) {
    const { name, email, password, password_confirmation, mobile_no } =
      this.state;
    if (!name || !email || !password || !password_confirmation || !mobile_no) {
      this.setState({ Errors: 'Please fill all field' });
      return;
    }
    if (password !== password_confirmation) {
      this.setState({ Errors: 'PASSWORD AND PASSWORD CONFIRMATION NOT MATCH' });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          axios
            .post(
              'https://burgerblast-pern-production.up.railway.app/api/v1/users',
              {
                user: {
                  name: name,
                  email: email,
                  mobile_no: mobile_no,
                },
              }
            )
            .then((res) => {
              let userr = {
                name: `${this.state.name}`,
                email: `${this.state.email}`,
                mobile_no: `${this.state.mobile_no}`,
              };
              console.log(userr, 'signup');
              this.props.setusersignup(userr);
              this.props.history.push('/restaurant');
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          this.setState({ Errors: error.message });
          console.log('error...', this.state.Errors);
        });

      event.preventDefault();
    }
  }

  handleLogoutClick() {
    auth.signOut().then(
      function () {
        console.log('Signed Out');
        alert('you were successfully logged out');
      },
      function (error) {
        console.error('Sign Out Error', error);
      }
    );
  }
  render() {
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

            <div class="right">
              <h5>SignUp</h5>
              <div class="inputs">
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={this.state.name}
                  onChange={(event) => this.handleChange(event)}
                />
                <br />
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={(event) => this.handleChange(event)}
                />
                <br />
                <input
                  type="text"
                  placeholder="mobile number"
                  name="mobile_no"
                  value={this.state.mobile_no}
                  onChange={(event) => this.handleChange(event)}
                />
                <br />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={(event) => this.handleChange(event)}
                />
                <br />
                <input
                  type="password"
                  placeholder="password_confirmation"
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={(event) => this.handleChange(event)}
                />
                <br />
              </div>

              <div Style="color:red">
                {this.state.Errors}
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
                  Signup
                </button>
              ) : (
                <button
                  className="login "
                  onClick={(event) => this.handleSubmit(event)}
                  Style="cursor:pointer"
                >
                  Signup
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
