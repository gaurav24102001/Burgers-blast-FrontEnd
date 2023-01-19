import axios from 'axios';
import React, { Component } from 'react';
import Headers from './Headers';

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      state: '',
      country: '',
      mobile_no: '',
      error: '',
    };
  }
  handlechange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handlesubmit = () => {
    if (
      this.state.address.trim() === '' ||
      this.state.city.trim() === '' ||
      this.state.state.trim() === '' ||
      this.state.country.trim() === '' ||
      this.state.mobile_no.trim() === '' ||
      this.props.user.name.trim() === '' ||
      this.props.user.email.trim() === ''
    ) {
      this.setState({ error: 'please fill all field' });
    } else {
      const user = {
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        mobile_no: this.state.mobile_no,
      };

      localStorage.setItem('add', JSON.stringify(user));
      let s = JSON.parse(localStorage.getItem('add'));

      this.props.history.push('/cart/checkout');
    }
  };

  render() {
    return (
      <div>
        <Headers
          login={this.props.loggedInStatus}
          count={this.props.count}
          history={this.props.history}
        />
        <div Style="margin:20px; min-height: 82vh">
          <h1 Style="margin-left:40%; font-weight:600"> Address Details</h1>
          <div Style="border: 2px solid rgb(215, 211, 211) ; height: auto ; width: 35%; margin-left:30%; margin-top:3%; padding:1%">
            <label Style="font-weight:bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              Style="width:100%; margin-top:2%; background-color:#D3D3D3"
              disabled
              value={this.props.user.name}
            ></input>
            <div Style="margin-top:0.4cm">
              <label Style="font-weight:bold" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                Style="width:100%; margin-top:1%; background-color:#D3D3D3"
                disabled
                value={this.props.user.email}
              ></input>
            </div>

            <div Style="margin-top:0.4cm">
              <label Style="font-weight:bold" htmlFor="Address">
                Address
              </label>
              <input
                type="text"
                id="Address"
                Style="width:100%; margin-top:2%;"
                name="address"
                value={this.state.address}
                onChange={(event) => this.handlechange(event)}
              ></input>
            </div>
            <div Style="margin-top:0.4cm">
              <label Style="font-weight:bold" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                Style="width:100%; margin-top:2%;"
                name="country"
                value={this.state.country}
                onChange={(event) => this.handlechange(event)}
              ></input>
            </div>
            <div Style="margin-top:0.4cm">
              <label Style="font-weight:bold" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                Style="width:100%; margin-top:2%;"
                name="state"
                value={this.state.state}
                onChange={(event) => this.handlechange(event)}
              ></input>
            </div>
            <div Style="margin-top:0.4cm">
              <label Style="font-weight:bold" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                Style="width:100%; margin-top:2%;"
                name="city"
                value={this.state.city}
                onChange={(event) => this.handlechange(event)}
              ></input>
            </div>
            <div Style="margin-top:0.4cm">
              <label Style="font-weight:bold" htmlFor="mobile_no">
                Mobile
              </label>
              <input
                type="text"
                id="mobile_no"
                Style="width:100%; margin-top:2%;"
                name="mobile_no"
                value={this.state.mobile_no}
                onChange={(event) => this.handlechange(event)}
              ></input>
            </div>
            {this.state.error === '' ? (
              console.log('')
            ) : (
              <div Style="color:red">{this.state.error}</div>
            )}
            <div> </div>
            <div Style="margin-top:1cm">
              <button
                Style="font-size:0.5cm ;cursor:pointer"
                onClick={() => this.props.history.push('/restaurants/cart')}
              >
                {' '}
                back to cart
              </button>
              <button
                Style="float:right; background-color:#8F00FF; color:white; font-weight:bolder; font-size:0.5cm; border:2px solid voilet; padding:0.1cm; cursor:pointer"
                onClick={() => {
                  this.handlesubmit();
                }}
              >
                {' '}
                Proceed
              </button>
            </div>
          </div>
        </div>
        <div className="footer">All right Reserved</div>
      </div>
    );
  }
}
