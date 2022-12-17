import React, { Component } from "react";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      loginErrors:""
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(email); 
      
      axios.get(`http://localhost:3000/api/v1/users/${email}`,
      {
        
       
      })
      .then((res)=>{
       
        
        this.handleSuccessfulAuth(res.data);
      })
      .catch((error)=>console.log(error))
    })
    .catch((error)=>{this.setState({loginErrors:error.message})
    console.log("error...",this.state.loginErrors)})
    event.preventDefault();
  }
  handleLogoutClick() {
    auth.signOut().then(
      function () {
        alert("you were successfully logged out");
      },
      function (error) {
        console.error('Sign Out Error', error);
      }
    );
  }
  handleSuccessfulAuth(user) {
    
    this.props.history.push('/restaurant');
    this.props.handleLogin(user);
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
		<p>This is burger Ordering App.<br></br> <br></br> We provide an ease online method to orders your favourite burger from different restaurant.
      
    </p>
		
		</div>
	</div>
	
	
		<div class="right">
		<h5>Login</h5>
		<p>Don't have an account?Please Create a<a href="/signup"> New Account</a> it takes less than a minute </p>
		<div class="inputs">
			<input type="email" placeholder="email" name = "email" value = {this.state.email} onChange={(event)=>this.handleChange(event)} /> 
			<br/>
			<input type="password" placeholder="password" name = "password" value = {this.state.password} onChange={(event)=>this.handleChange(event)}  />
		</div>
			
      <div Style="color:red">
      {this.state.loginErrors}
			<br/>
      <br/>
      </div>
			
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
<div Style="background-color:Black ;padding:10px ; color:white; text-align:center">
          All right Reserved
        </div>
      </div>
      
    );
  }
}
