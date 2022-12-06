import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      registrationErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { name, email, username, password, password_confirmation } =
      this.state;
    if (password !== password_confirmation) {
      alert('PASSWORD AND PASSWORD CONFIRMATION NOT MATCH');
    }
    else
    {

    axios
      .post(
        'http://localhost:3000/api/v1/signin',
        {
          user: {
            name: name,
            email: email,
            username: username,
            password: password,
            password_confirmation: password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === 'created') {
          this.props.handleSuccessfulAuth(response.data);
        } else {
          alert('uername already exist');
        }
      })
      .catch((error) => {
        console.log('registration error', error);
      });
    event.preventDefault();
    }
  }

  render() {
    return (
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
              <input
                type="text"
                placeholder="user name"
                name="username"
                value={this.state.username}
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

            <br />
            <br />

            <div class="remember-me--forget-password">
              <span className="logins">
                <label>
                  <input type="checkbox" name="item" value="checked" />
                  <span class="text-checkbox">Remember me</span>
                </label>
              </span>
            </div>

            <br />
            <button
              className="login"
              onClick={(event) => this.handleSubmit(event)}
            >
              Signup
            </button>
          </div>
        </div>
      </body>
    );
  }
}
