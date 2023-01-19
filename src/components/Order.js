import React, { Component } from 'react';
import Headers from './Headers';
import axios from 'axios';

export default class Order extends Component {
  state = {
    orders: {},
  };
  componentDidMount = () => {
    axios
      .get(`https://burgerblast-pern-production.up.railway.app/api/v1/orders/${this.props.user.email}`)
      .then((res) => {
        this.setState({ orders: res.data });
      });
  };
  render() {
    return (
      <div>
        <Headers login={this.props.loggedInStatus} count={this.props.count} history = {this.props.history} />
        <h1 Style="text-align:center; margin-top:20px;">
          {' '}
          YOUR PREVIOUS ORDERS ARE
        </h1>
        <div>
          {this.state.orders['total']
            ? this.state.orders['total'].map((value, index) => {
                return (
                  <div>
                    <div Style="display:flex; justify-content:space-between; width:70wh; margin-left:20px; font-weight:bolder; margin-top:40px;">
                      <span>{index + 1}. </span>{' '}
                      <span> ORDER ID: {value.id}</span>ADDRESS: {value.address}{' '}
                      <span></span>CONTACTNO: {value.mobile_no}
                      <span></span>{' '}
                    </div>
                    {this.state.orders['order1'] ? (
                      <div>
                        <div className="cartgrid" Style="margin-top:40px;">
                          <div Style="background-color:grey">BURGER NAME</div>
                          <div Style="background-color:grey">RESTAURANT</div>
                          <div Style="background-color:grey">AMOUNT</div>
                          <div Style="background-color:grey">QUANTITY</div>
                          <div Style="background-color:grey">TOTAL</div>
                        </div>

                        {this.state.orders[`order${index + 1}`].map((val) => {
                          return (
                            <div className="cartgrid" Style="margin-top:40px;">
                              <div> {val.burger_name}</div>
                              <div> {val.restaurant_id}</div>
                              <div>{val.amount}</div>
                              <div>
                                <span>
                                  <span Style="margin-left:25px;">
                                    {'  ' + val.quantity + '   '}
                                  </span>
                                </span>
                              </div>
                              <div> {val.amount * val.quantity}</div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      console.log('hell')
                    )}
                  </div>
                );
              })
            : console.log('nothing is there')}
        </div>
        {/* {this.props.user.email} */}
      </div>
    );
  }
}
