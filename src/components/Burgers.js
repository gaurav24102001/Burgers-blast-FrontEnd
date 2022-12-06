import { checkPropTypes } from 'prop-types';
import React from 'react';

class Burgers extends React.Component {
  render() {
    const burgers = this.props.burgers;
    const renderBurgers = burgers.map((burger) => (
      <div className="menu-burger">
       <img className="img  " src={`..${burger.image}`} alt="no render"></img>

        <div key={burger.id}>
          <div className="burger-name"> {burger.name} </div>
          <br />
          <div> {burger.description} </div>
          <br />
        </div>
        <div className="price"> {burger.price}</div>
          <button className="order" onClick={()=>{this.props.addneworders(burger)}}>
          {"order"}
        </button>
      </div>
    ));
    return <div>{renderBurgers}</div>;
  }
}

export default Burgers;
