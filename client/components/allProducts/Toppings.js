import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "/client/store";

class Toppings extends Component {
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
  }
  addProductToCart(product) {
    const quantity = 1;
    this.props.addToCart(product, quantity);
  }
  render() {
    const { products } = this.props;
    const { addProductToCart } = this;
    return (
      <div className="content">
        <h1>Boba Girls Toppings</h1>
        {
        <div>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "topping")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <div className="teaprice">${product.price}</div>

                      <button
                        className="addtocart"
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
      </div>
    );
  }
}

const mapState = ({ products }) => {
  return {
    products,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    addToCart: (product, quantity) =>
      dispatch(addToCart(product, quantity, history)),
  };
};

export default connect(mapState, mapDispatch)(Toppings);
