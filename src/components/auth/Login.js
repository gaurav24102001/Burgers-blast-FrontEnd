import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    axios
      .post(
        "http://localhost:3000/api/v1/login",
        {
          user: {
            username: username,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
        else
        {
          alert("INVALID CREDENTIALS")
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <body className="login">
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1>Hello World.</h1>
		<p>This is burger Ordering App.<br></br> <br></br> We provide an ease online method to orders your favourite burger from different restaurant.
      
    </p>
		
		</div>
	</div>
	
	
		<div class="right">
		<h5>Login</h5>
		<p>Don't have an account?Please Create a New Account it takes less than a minute</p>
		<div class="inputs">
			<input type="text" placeholder="user name" name = "username" value = {this.state.username} onChange={(event)=>this.handleChange(event)}/> 
			<br/>
			<input type="password" placeholder="password" name = "password" value = {this.state.password} onChange={(event)=>this.handleChange(event)}  />
		</div>
			
			<br/><br/>
			
		<div class="remember-me--forget-password">
	<span className="logins">		
	<label>
		<input type="checkbox" name="item" value="checked"/>
		<span class="text-checkbox">Remember me</span>
	</label>

      </span>	
		</div>
			
			<br/>
			<button className="login" onClick={(event)=>this.handleSubmit(event)}>Login</button>

	</div>

	
</div>
</body>
      
    );
  }
}
