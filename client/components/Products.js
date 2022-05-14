import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { addToCart } from "../store";
import MilkPowders from "./allProducts/MilkPowders";
import Teas from "./allProducts/Teas";
import Toppings from "./allProducts/Toppings";
import Syrups from "./allProducts/Syrups";
import Merchandise from "./allProducts/Merchandise";
import Kits from "./allProducts/Kits";

class Products extends Component {
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart(product) {
    console.log("Add product to cart");
    const quantity = 1;
    this.props.addToCart(product, quantity);
  }

  render() {
    const { products, user } = this.props;
    const { addProductToCart } = this;
    return (
      <div className="content">
        <h1 className="product1">All Products</h1>
        {<Teas products={products} addProductToCart={addProductToCart} />}
        {<Syrups products={products} addProductToCart={addProductToCart} />}
        {<Toppings products={products} addProductToCart={addProductToCart} />}
        {<MilkPowders products={products} addProductToCart={addProductToCart} />}
        {<Merchandise products={products} addProductToCart={addProductToCart} />}
        {<Kits products={products} addProductToCart={addProductToCart} />}

        <Link to="/newproducts">
          {user.isAdmin ? (
            <div className="admindelete">
              <h5 className="admin"> Admin Only: </h5>
              <button className="admindeleteb">Add New Product</button>
            </div>
          ) : null}
        </Link>
      </div>
    );
  }
}

const mapState = ({ products, auth }) => {
  const user = auth;
  return {
    products,
    user,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    addToCart: (product, quantity) =>
      dispatch(addToCart(product, quantity, history)),
  };
};

export default connect(mapState, mapDispatch)(Products);
