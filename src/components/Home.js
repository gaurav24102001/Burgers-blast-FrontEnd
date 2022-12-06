import React, { Component } from "react";
import axios from "axios";

import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      log:"SIGNIN"
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  login=()=>
  {
   
    this.setState({log:"LOGIN"});
  

  }
  signin=()=>
  {

    this.setState({log:"SIGNIN"});

  }
  handleSuccessfulAuth(data) {
    console.log("here");
    this.props.handleLogin(data);
    this.props.history.push("/restaurant");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3000/api/v1/loggedout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    console.log(this.props.history);
    return (
      <div>

          <div Style="background-color:Black ;padding:10px ; color:white; max-height:10vh ">
           <span Style="margin-left:30%">WELCOME TO BURGER BLAST </span>
           <span Style="float:right">
            <span Style="margin-left:5px; cursor:pointer; color:white "onClick={this.login} onMouseEnter={(e)=>e.target.style.color="blue"} onMouseLeave={(e)=>e.target.style.color="white"}> LOGIN</span>
            <span Style="margin-left:5px;cursor:pointer; color:white "onClick={this.signin} onMouseEnter={(e)=>e.target.style.color="blue"} onMouseLeave={(e)=>e.target.style.color="white"}> SIGNIN</span>
            </span> 
          </div>

        <div Style="min-height:78vh">
          {
          this.props.loggedInStatus === "NOT_LOGGED_IN"?
          (
          <div>
            
            {
              this.state.log==="LOGIN" ?<Login handleSuccessfulAuth={this.handleSuccessfulAuth} />:  <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
            }
          </div>
          )
          :
          (<div Style="margin-top:5%">
            <h1 Style = "text-align:center">THANKS FOR VISITING.</h1>
            <h1 Style = "text-align:center">HAVE A NICE DAY</h1>
            <button onClick={() => this.handleLogoutClick()} Style="; margin-left:50%">Logout</button>
               </div>
          )
        }
        </div>

          <div  Style="background-color:Black ;padding:10px ; color:white; text-align:center">
            All right Reserved
          </div>
        </div>
       
    );
  }
}
