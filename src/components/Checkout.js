import React, { Component } from 'react';
import Headers from './Headers';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placed: 'NOT',
    };
  }
  handlesubmit = () => {
    let add = JSON.parse(localStorage.getItem('add'));
    let adress =
      add['address'] +
      ' ,' +
      add['city'] +
      ' ,' +
      add['state'] +
      ' ,' +
      add['country'];
    const data = {};
    //...fill your object like this for example
    data['address'] = adress;
    data['cartitems'] = this.props.cartItems;
    data['user'] = this.props.user.email;
    data['mobile'] = add.mobile_no;

    axios
      .post(
        'https://burgerblast-pern-production.up.railway.app/api/v1/orders/',
        data
      )
      .then((res) => {
        if (res.data === 'done') {
          this.setState({ placed: 'YES' });
          this.props.clear();
          // this.props.history.push('/');
        }
      });
  };

  render() {
    let add = JSON.parse(localStorage.getItem('add'));
    let adress =
      add['address'] +
      ' ,' +
      add['city'] +
      ' .' +
      add['state'] +
      ' ,' +
      add['country'];

    return (
      <div>
        <Headers
          login={this.props.loggedInStatus}
          count={this.props.count}
          history={this.props.history}
        />
        {this.state.placed === 'NOT' ? (
          <div Style="margin:20px; min-height: 82vh">
            <h1 Style="text-align:center"> YOUR FINAL ORDER IS</h1>
            <div className="cartgrid" Style="margin-top:40px;">
              <div Style="background-color:grey">BURGER NAME</div>
              <div Style="background-color:grey">RESTAURANT</div>
              <div Style="background-color:grey">AMOUNT</div>
              <div Style="background-color:grey">QUANTITY</div>
              <div Style="background-color:grey">TOTAL</div>
              <div Style="background-color:grey">AVAILABLE</div>
            </div>
            {this.props.cartItems.map((burgers) => (
              <div className="cartgrid">
                <div> {burgers.name}</div>
                <div> {burgers.restaurant}</div>
                <div>{burgers.price}</div>
                <div>
                  <span>
                    <span Style="margin-left:25px;">
                      {'  ' + burgers.count + '   '}
                    </span>
                  </span>
                </div>
                <div> {burgers.count * burgers.price}</div>
                <div> {'YES'}</div>
              </div>
            ))}
            <div Style="margin-top:50px; text-align:center">
              <div>
                <h1 Style="display:inline">It is deliveres at address: </h1>{' '}
                <h2 Style="display:inline"> {adress} </h2>
              </div>
              <div Style="margin-top:20px;">
                <h1 Style="display:inline">MOBILE NO: </h1>
                <h2 Style="display:inline">{add.mobile_no}</h2>
              </div>
            </div>
            {this.props.cartItems.length === 0 ? (
              console.log('')
            ) : (
              <button
                className="button2"
                Style="  color:black; font-weight:bolder; height:50px; width:140px;"
                onClick={() => this.handlesubmit()}
              >
                CONFIRM ORDER
              </button>
            )}
            
          </div>
        ) : (
          <div Style="margin:20px; min-height: 75vh">
            <div Style="text-align:center; margins:40px;">
              <h1 Style="margin-top:40px;">
                YOUR ORDER HAS BEEN PLACED SUCCESSFULLY.
              </h1>
              <h1 Style="margin-top:40px;">THANKS YOU</h1>
              <h1 Style="margin-top:40px;">HAVE A NICE DAY</h1>
            </div>
          </div>
        )}
        <div className="footer">All right Reserved</div>
      </div>
    );
  }
}
