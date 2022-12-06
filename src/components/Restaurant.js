import React from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Header from './Header';

class Restaurant extends React.Component {
  state = {
    ourRestaurants: [], // it is basically array of objects.
    display: false,
    title: '',
    url: '',
  };

  displayList = () => {
    const display = this.state.display;
    this.setState({ display: !display });
  };

  getTitle = (restaurant) => {
    const { title, url } = restaurant;

    // const title = restaurant.title;
    // const url - restaurant.url;
    // ya to line no 17 jaise likh lo ya to line no. 18+19 jaise.
    this.setState({ title, url, display: false });
  };

  goToRestaurant = () => {
    const { url } = this.state;

    this.props.history.push(`/restaurant/${url}`);
  };

  render() {
    return (
      <div className='body' >
        {this.props.loggedInStatus==="NOT_LOGGED_IN" ? { } :
        

      
      <header className='top' >
            <div className='header-content'>
                <div className='header-rating'>
                  <div className='header-rating_tag'>Rating:</div>
                  <div className='header-rating_icon'>★★★★★</div>
              </div>
  
              <h1>  Welcome {this.props.name.name} to the Burger Blast Web app</h1> 
                
              </div>
            
            <div >
      <div className="restaurant_select" >
        <div className="restaurant_select_top">
          <div
            onClick={this.displayList}
            className="restaurant_select_top-header font-effect-outline"
          >
            {this.state.title ? this.state.title : 'Choose a restaurant'}
          </div>

          <div className="arrow_picker">
            <div className="arrow_picker-up"></div>
            <div className="arrow_picker-down"></div>
          </div>
        </div>

        {this.state.display ? (
          <div className="restaurant_select_bottom">
            <ul>
              {this.state.ourRestaurants.map((restaurant) => {
                return (
                  <li
                    onClick={() => this.getTitle(restaurant)}
                    key={restaurant.id}
                  >
                    {restaurant.title}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {this.state.title && !this.state.display ? (
          <button onClick={this.goToRestaurant}> Go to the restaurant</button>
        ) : null}
      </div>
      </div>
          </header>
  }
          </div>

    );
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/restaurants')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ourRestaurants: data,
        });
      });
  }
}

export default Restaurant;
