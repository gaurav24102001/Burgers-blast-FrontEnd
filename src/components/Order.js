import React from 'react';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previous_order: []
    };

  }
  delete(burger) {
    this.props.delete(burger);
  }
  home = () => {
    console.log("in home")
    this.props.history.push('/');
  };

  placedorder = (orders) => {
    axios
      .post(
        'http://localhost:3000/api/v1/order',
        {
          orders: orders,
          user: this.props.user,
          restaurant: this.props.restaurant,
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.props.placeorder("PLACED");
      })
      .catch((error) => {});
  };
  
  previousorder=()=>
  {
   
      
    let username = this.props.user.username;
    let restaurant = this.props.restaurant;
    axios.get(`http://localhost:3000/api/v1/${username}/${restaurant}/order`,
    { withCredentials: true }
    )
    .then((response) => {
      
      this.setState({previous_order:response.data.orders})
      console.log("orders" ,response.data.orders)
      this.props.placeorder("PREVIOUS_ORDER")
     
    })
    .catch((error) => {});

  }
  render() {
    const orders = this.props.orders.map((burger) => (
      <Fade left cascade>
        <ul className="order">
          <li key ={burger.id}>
            <img
              className="img  "
              src={`..${burger.image}`}
              alt="no render"
            ></img>
            <div>
              <div id="pot" className="name">
                {burger.name}
              </div>
              <button
                onClick={() => {
                  this.delete(burger);
                }}
              >
                X
              </button>
            </div>

            <span class="price">{burger.price}</span>
          </li>
        </ul>
      </Fade>
    ));

    const ordersafterplaced = this.props.orders.map((burger) => (
      <Fade right cascade>
        <ul className="order">
          <li key={burger.id} Style="display:grid; grid-template-columns: 1fr 1fr">
            <div className="name" Style="font-size:0.7cm">
              {burger.name}
            </div>

            <div Style="text-align:center; font-weight:bolder; font-size:0.7cm">
              {burger.price}
            </div>
          </li>
        </ul>
      </Fade>
    ));
    const previousorders = this.state.previous_order.map((burger) => (
      <Fade left cascade>
        <ul className="order">
          <li key ={burger.id}>
            <img
              className="img  "
              src={`..${burger.image}`}
              alt="no render"
            ></img>
            <div>
              <div id="pot" className="name">
                {burger.name}
              </div>
            </div>

            <span class="price">{burger.price}</span>
          </li>
        </ul>
      </Fade>
    ));
    

    return (
      <div className>
        {this.props.order_status === 'NOTPLACED' ? (
          <div>
            <h2>Your Order</h2>
            <p> {orders}</p>
            <div className="total"> Total ={this.props.total} </div>
            <div className="placed">
              <button onClick={() => this.placedorder(this.props.orders)}>
                PLACE ORDER
              </button>
              <button Style=" margin-left : 10%"onClick={()=>this.previousorder()}> Previos Orders</button>
            </div>
          </div>
        ) 
        :
         
        (
         this.props.order_status==='PLACED' ?(
          <div>
            <h1 Style="font-weight:bolder; color:gold">
              {' '}
              YOU HAVE SUCCESSFULLY PLACED YOUR ORDER. YOUR ORDER IS
            </h1>
            <div>{ordersafterplaced}</div>
            <div className="total" Style="font-size:1cm ; text-align:right ">
              {' '}
              Total ={this.props.total}{' '}
            </div>
            <button
              onClick={() => {
                this.props.placeorder("NOTPLACED");
              }}
              Style="margin-left:10% ; margin-top:10%"
            >
              ANOTHER ORDER
            </button>
            <button Style="margin-left:10%"
              onClick={() => {
                this.home();
              }}
            >
              HOME
            </button>
            <button Style=" margin-left : 10%; margin-top:5%"onClick={()=>this.previousorder()}> Previos Orders</button>

            
          </div>
            )
            :
            (<div>
              <h1> YOUR PREVIOUS ORDERS ARE:
              </h1>
              {previousorders}
              <button
              onClick={() => {
                this.props.placeorder("NOTPLACED");
              }}
              Style="margin-left:10% ; margin-top:10%"
            >
              NEW ORDER
              
            </button>
            <button Style="margin-left:10%"
              onClick={() => {
                this.home();
              }}
            >
              HOME
            </button>
            </div>
            )
        )}
      </div>
    );
  }
}
export default Order;
