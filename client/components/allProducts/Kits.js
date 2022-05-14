import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from '/client/store';

class Kits extends Component {
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart(product) {
    console.log("Add product to cart")
    const quantity = 1;
    this.props.addToCart(product, quantity);
  }

  render() {
    const { products } = this.props;
    const { addProductToCart } = this;
    return (
      <div className="content">
        <h1 className='producttea'>Bubble Tea DIY Kits</h1>
            {/* <p className='kitdiv'>(Each cup serves 400mL)</p> */}
        {
        <div>
            <ul className="items-list">
              {products
                .filter((product) => product.key === "kit")
                .map((product) => {
                  return (
                    <li className="item-container" key={product.id}>
                      <img src={product.imageUrl} />

                      <Link className='productname1' to={`/products/${product.id}`}>{product.name}</Link>
                      <div className="teaprice">${product.price}</div>

                      <button
                          className="addtocart-btn"
                          onClick={() => addProductToCart(product)}
                      >
                          Add To Cart
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          }
          <div>
          <ul className="kits">
              <li className='kitsdiv'>MAKE SURE TO INDICATE UPON CHECKOUT:</li>
              <li>Choice of tea leaves</li> 
              <li>Choice of fruit syrup (if applicable)</li> 
              <li>If choices are not indicated, a standard choice would be given.</li> 
            </ul>
          </div>
      </div>
    );
  }
}

const mapState = ({ products }) => {
  return {
    products
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    addToCart: (product, quantity) =>
      dispatch(addToCart(product, quantity, history)),
  };
};


export default connect(mapState, mapDispatch)(Kits);
