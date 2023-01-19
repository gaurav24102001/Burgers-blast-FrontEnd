import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default class Headers extends Component {
  render() {
    const handleLogoutClick = () => {
      let history = this.props.history;
      auth.signOut().then(
         function () {
         history.push('/');
          alert('you were successfully logged out');
        },
        function (error) {
          console.error('Sign Out Error', error);
        }
      );
    };
    return (
      <div Style="border-bottom:2px solid black ;padding:5px ; color:black; height:10vh ; font-weight:bold">
        <img
          Style="float:left;width:80px; height:40px; margin-top:px;"
          src="/icon.png"
        />
        <span Style="float:left;margin-left:1%; font-size:35px; display:inline-block; margin-bottom:10px; color:black ">
          Burger
        </span>
        <span Style="float:left;font-size:35px; display:inline-block; margin-bottom:10px; color:red ">
          {' '}
          Blast{' '}
        </span>
        <span Style="float:left;margin-left:5% ;margin-top:1%; display:flex; justify-content: space-evenly; width:600px;  flex-direction:row; ">
          <span
            Style="display:flex; "
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
            }}
          >
            <Link Style="text-decoration:none; color:black; border:none" to="/">
              Home
            </Link>
          </span>{' '}
          <span
            Style="display:flex"
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
            }}
          >
            {this.props.login === 'NOT_LOGGED_IN' ? (
              <span
                onClick={() => {
                  window.alert('please login first');
                }}
              >
                Restaurants
              </span>
            ) : (
              <Link
                Style="text-decoration:none; color:black; border:none"
                to="/restaurant"
              >
                Restaurants
              </Link>
            )}
          </span>{' '}
          <span
            Style="display:flex"
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
            }}
          >
            Offers
          </span>
          <span
            Style="display:flex"
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
            }}
          >
            Contact us
          </span>
          <span
            Style="display:flex"
            onMouseEnter={(e) => {
              e.target.style.cursor = 'pointer';
            }}
          >
            {this.props.login === 'NOT_LOGGED_IN' ? (
              <span
                onClick={() => {
                  window.alert('please login first');
                }}
              >
                Your Order
              </span>
            ) : (
              <Link
                Style="text-decoration:none; color:black; border:none"
                to="/orders"
              >
                Your Order
              </Link>
            )}
          </span>{' '}
        </span>
        {this.props.login === 'NOT_LOGGED_IN' ? (
          <span Style="float:right">
          <button
          onClick={() => handleLogoutClick()}
          className="button1"
          Style="border:2px solid black; margin-left:10px;"
        >
          {'   '}
          Logout
        </button>
      </span>
              
            ) : 
            (
              <span Style="float:right">
          <span Style="color:BLUE; margin-top:7px; font-weight:bold; font-size:0.7cm; cursor:pointer; display:inline-block;">
            {' '}
            <Link Style=" text-decoration:none" to="/restaurants/cart">
              Cart
            </Link>
          </span>
          <span Style="border: solid red 2px; height: auto; width: auto; border-radius:50%; padding-right: 7px; background-color: coral; margin-left: 10px;font-size:0.7cm; text-align:center">
            {' '}
            {this.props.count}{' '}
          </span>
          <button
            onClick={() => handleLogoutClick()}
            className="button1"
            Style="border:2px solid black; margin-left:10px;"
          >
            {'   '}
            Logout
          </button>
        </span>
              
            )}

        

          
      </div>
    );
  }
}
