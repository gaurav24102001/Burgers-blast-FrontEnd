import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>

        <div className="filter-sort">
          Order{' '}
          <select value={this.props.sort} onChange={(event)=>this.props.sortProducts(event)}>
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>


        <div className="filter-size">
          TYPE{' '}
          <select value={this.props.type} onChange={(event)=>this.props.typeProducts(event)}>
            <option value="">All</option>
            <option value="nonveg">Non-Veg</option>
            <option value="veg">Veg</option>
          </select>
        </div>
      </div>
    );
  }
}
