import React, { Component } from 'react';
import Headers from './Headers';

export default class Cart extends Component {
  render() {
  
    return (
      <div>
        {this.props.loggedInStatus === 'NOT_LOGGED_IN' ? (
          {}
        ) : (
          <div >
               <Headers login={this.props.loggedInStatus} count={this.props.count} history = {this.props.history}/>

            <div Style="margin:20px; min-height: 82vh">
              <h1 Style="text-align:center"> Shopping Cart</h1>
              <div className="cartgrid">
                <div Style="background-color:grey">BURGER NAME</div>
                <div Style="background-color:grey">RESTAURANT</div>
                <div Style="background-color:grey">AMOUNT</div>
                <div Style="background-color:grey">QUANTITY</div>
                <div Style="background-color:grey">TOTAL</div>
                <div Style="background-color:grey">REMOVE</div>
              </div>
              {this.props.cartItems.map((burgers) => (
                <div className="cartgrid">
                  <div> {burgers.name}</div>
                  <div> {burgers.restaurant}</div>
                  <div>{burgers.price}</div>
                  <div>
                    <span>
                      <span
                        Style="border:solid 2px black ; cursor:pointer ; min-height:10px; min-width:10px"
                        onClick={() => this.props.increase(burgers)}
                      >
                       {"\xa0+"}
                      </span>

                      <span>{' '+  burgers.count+ ' ' }</span>
                      <span
                        Style="border:solid 2px black ; cursor: pointer; min-height:10px; min-width:50px"
                        onClick={() => this.props.decrease(burgers)}
                      >
                        {" \xa0-\xa0 "}
                      </span>
                    </span>
                  </div>
                  <div> {burgers.count * burgers.price}</div>
                  <div
                    onClick={() => this.props.deleteitem(burgers)}
                    Style="cursor:pointer"
                  >
                    {' '}
                    X
                  </div>
                </div>
              ))}
              {
                this.props.cartItems.length===0?(console.log("")):(<button className='button2' onClick={()=> {this.props.history.push('/address')}} > checkout </button>)
              }
            
            </div>


            <div className="footer">All right Reserved</div>
          </div>
        )}
      </div>
    );
  }
}
