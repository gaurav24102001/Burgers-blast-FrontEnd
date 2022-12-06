import React, { Component } from 'react';
import { FetchBurgers, CreateBurger } from '../actions/burgerAction';

class AddBurger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      image: '',
      status: '',
      description: '',
    };
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  add = (burger) => {
    CreateBurger(burger, this.props.restid);
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    const burger = this.state;
    this.props.newburger(burger);
    this.add(burger);
  };

  render() {
    console.log(typeof this.props.newburger);
    return (
      <div>
        <h1 Style= "text-align: center; color:red; "> ADD A BURGER </h1>
        <br></br>
        <br></br>
      
      <form onSubmit={this.handleOnSubmit}>
        <div Style="display: grid; grid-template-columns: 0.6fr 1fr; gap:20px">
        <label htmlFor="burger_name">Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleOnChange}
          placeholder="Burger Name"
          required
          // Style="margin-left:20%"
        />
        <label htmlFor="burger_price">Price:</label>
        <input
          type="number"
          name="price"
          value={this.state.price}
          onChange={this.handleOnChange}
          placeholder="Price"
          required
          // Style="margin-left:20%"
        />
        <label htmlFor="burger_description">Description:</label>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleOnChange}
          placeholder="Description"
          required
          // Style="margin-left:20%" 

        />
        <label htmlFor="burger_image">Image:</label>
        <input
          type="text"
          name="image"
          value={this.state.image}
          onChange={this.handleOnChange}
          placeholder="Image link"
          required
        />
        </div>
        <br></br>
        <br></br>
        <div Style="text-align:center">
        <button Style="text-align:center">+ADD BURGER</button>
        </div>

        
        
      </form>
      </div>
    );
  }
}

export default AddBurger;
