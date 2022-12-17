import React, { Component } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      Errors:""
    });
  }

  handleSubmit(event) {
    const { name, email, password, password_confirmation, mobile_no } =
      this.state;
      if(!name || !email || !password || !password_confirmation || !mobile_no)
      {
        this.setState({Errors:"Please fill all field"})
        return;
      }
    if (password !== password_confirmation) {
      this.setState({Errors:"PASSWORD AND PASSWORD CONFIRMATION NOT MATCH"})
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          axios
            .post('http://localhost:3000/api/v1/users', {
              user: {
                name: name,
                email: email,
                mobile_no: mobile_no,
              },
            })
            .then((res) => {
              this.handleSuccessfulAuth(res);
            })
            .catch((error) => console.log(error));
        })
        .catch((error)=>{this.setState({Errors:error.message})
    console.log("error...",this.state.Errors)})

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
  handleSuccessfulAuth(user) {
    this.props.history.push('/restaurant');

    this.props.handleLogin(user.data);
  }

  render() {
    return (
      <div>
        <div Style="background-color:Black ;padding:10px ; color:white; max-height:10vh ">
          <span Style="margin-left:30%">WELCOME TO BURGER BLAST </span>
          <span Style="float:right">
            <button onClick={this.handleLogoutClick}> LOGOUT </button>
          </span>
        </div>

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
			<br/>
      <br/>
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
              <button
                className="login"
                onClick={(event) => this.handleSubmit(event)}
              >
                Signup
              </button>
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
