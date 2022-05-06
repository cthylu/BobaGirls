import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../store";
import { addToCart, fetchCart } from "../store/cart";

class Products extends Component {
  async componentDidMount() {
    this.props.loadCart();
    this.props.loadOrders();
  }

  render() {
    const { products, addProductToCart } = this.props;
    return (
      <div className="content">
        <h1>Boba Girls Products</h1>
        {
          <div>
            <h2>Teas:</h2>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "tea")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <div className="teaprice">${product.price}</div>

                      <button
                        id="addtocart"
                        type="add"
                        onClick={() => {
                          addProductToCart(product);
                        }}
                      >
                        Add To Cart
                      </button>
                    </li>
                  );
                })}
            </ul>
            <h2>Toppings:</h2>
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
                        id="addtocart"
                        onClick={() => addProductToCart(product)}
                      >
                        Add To Cart
                      </button>
                    </li>
                  );
                })}
            </ul>

            <h2>Merchandise:</h2>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "merchandise")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />

                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <div className="teaprice">${product.price}</div>

                      <button
                        id="addtocart"
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

const mapState = (state) => {
  console.log("Products state", state);
  const orders = state.orders;
  //const order = orders.find(order => order.userId === match.params.campusId*1) || {};
  const products = state.products;
  return {
    products,
    //order
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadCart: () => dispatch(fetchCart()),
    loadOrders: () => dispatch(fetchOrders()),
    addProductToCart: (product) => dispatch(addToCart(product, history)),
  };
};

export default connect(mapState, mapDispatch)(Products);
