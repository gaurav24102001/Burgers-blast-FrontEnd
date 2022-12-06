import React from 'react';
import Order from './Order';
import Header from './Header';
import Burgers from './Burgers';
import AddBurger from './AddBurger';
import { FetchBurgers, CreateBurger } from '../actions/burgerAction';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      burgers: [],
      orders: [],
      total:0,
      order_status:"NOTPLACED"
    };
  }
  componentDidMount() {
    FetchBurgers(this.props.match.params.restaurantId).then((burgers) =>
      this.setState({ burgers })
    );
  }

    addNewBurger=(burger)=>{
      
      this.setState({burgers:[...this.state.burgers,burger]})
     
      
    }
    addorder = (order) =>
    {
    
     if(this.state.order_status==="NOTPLACED") 
     {
      this.setState({orders:[...this.state.orders,order]})
      this.setState({total: this.state.total + order.price})
     }
    }
    deleteorder(burger)
    { 
      const filteredorder = this.state.orders.filter((item) => item.name !== burger.name);
      this.setState({orders:filteredorder});
      this.setState({total: this.state.total - burger.price})


    }
    placeorder(x)
    {
      if(x==="PLACED")
      {
        this.setState({order_status:"PLACED"})
      }
      else if(x==="NOTPLACED")
      { 
        this.setState({order_status:"NOTPLACED", orders:[], total:0})
      }
      else if(x==="PREVIOUS_ORDER")
      {
        this.setState({order_status:"PREVIOS_ORDER", orders:[], total:0})

      }
      else
      {

      }
    }

  render() {
    return (
      <div className="burger-paradise">
        <div>
          <Burgers  burgers={this.state.burgers} addneworders = {(burger)=>this.addorder(burger)} />
        </div>
        <Order order_status = {this.state.order_status} history = {this.props.history}  placeorder = {(x)=>this.placeorder(x)} orders={this.state.orders} delete = {(burgername) => this.deleteorder(burgername)} total = {this.state.total} user={this.props.user} restaurant= {this.props.match.params.restaurantId}/>
        <div>
          <AddBurger restid = {this.props.match.params.restaurantId} newburger = {(burger)=>this.addNewBurger(burger)}/>
                                                                            {/*      |||
                                                                          this burger come from child component
                                                                          */}
         </div> 
      </div>                                                                         
    );
  }
}

export default App;
