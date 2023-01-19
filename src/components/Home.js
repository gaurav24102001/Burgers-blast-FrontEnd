import React from 'react';
import { FetchBurgers, CreateBurger } from '../actions/burgerAction';
import Filter from './Filter';
import Headers from './Headers';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      actualburgers: [],
      burgers: [],
      sort: 'Latest',
      type: 'all',
    };
  }
  componentDidMount() {
    FetchBurgers(this.props.match.params.restaurantURL).then((burgers) => {
      this.setState({ actualburgers: burgers, burgers: burgers });
     
    });
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      burgers: this.state.burgers
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._name < b._name
            ? 1
            : -1
        ),
    }));
  };
  typeProducts = (event) => {
    const type = event.target.value;
    this.setState({ type: type });
    if (event.target.value === '') {
      this.setState({ burgers: this.state.actualburgers });
    } else if (event.target.value === 'nonveg') {
      this.setState({
        burgers: this.state.actualburgers.filter(
          (burger) => burger.type === 'nonveg'
        ),
      });
    } else {
      this.setState({
        burgers: this.state.actualburgers.filter(
          (burger) => burger.type === 'veg'
        ),
      });
    }
  };

  render() {
    return (
      <div>
        {this.props.loggedInStatus === 'NOT_LOGGED_IN' ? (
          {}
        ) : (
          <div>
            <div>
              <Headers count={this.props.count} history = {this.props.history}/>
            </div>

            <Filter
              count={this.state.burgers.length}
              sort={this.state.sort}
              type={this.state.type}
              typeProducts={this.typeProducts}
              sortProducts={this.sortProducts}
            />

            <div Style="margin:20px; min-height: 82vh">
              <ul className="products">
                {this.state.burgers.map((product) => (
                  <li>
                    <div Style="margin-left: 20px; " className="product">
                      <img
                        Style="max-height: 200px; max-width: 200px; min-height:200px; min-width:200px;"
                        src={product.image}
                        alt={product.title}
                      ></img>

                      <span className="product-price">
                        <p>{product.name}</p>
                        <span>{product.price}</span>
                      </span>
                      <div Style="font-size:15px; min-height:60px;">
                        {product.description}
                      </div>

                      <button
                        onClick={() =>{
                          product["restaurant"]= this.props.match.params.restaurantURL
                          console.log(product)
                           this.props.addtoCart(product)}}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer">All right Reserved</div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
