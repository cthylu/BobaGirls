import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { addToCart } from "../store";
import MilkPowders from "./allProducts/MilkPowders";
import Teas from "./allProducts/Teas";
import Toppings from "./allProducts/Toppings";
import Syrups from "./allProducts/Syrups";
import Merchandise from "./allProducts/Merchandise";

class Products extends Component {
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
    const { products, user } = this.props;
    //const { addProductToCart } = this;
    return (
      <div className="content">
        <h1 className="product1">All Products</h1>
        {<Teas products={products} addProductToCart={this.addProductToCart} />}
        {<Syrups products={products} addProductToCart={this.addProductToCart} />}
        {<Toppings products={products} addProductToCart={this.addProductToCart} />}
        {<MilkPowders products={products} addProductToCart={this.addProductToCart} />}
        {<Merchandise products={products} addProductToCart={this.addProductToCart} />}

        <Link to='/newproducts'>
              { user.isAdmin ? (
              <div className='admindelete'>
              <h5 className='admin'> Admin Only: </h5>
              <button className='admindeleteb'>Add New Product</button>
              </div>
              ) : null }
            </Link>
        { /*
          <div>
            <h2 className="producttea">Loose Tea Leaves</h2>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "tea")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />
                      <Link className="productname1" to={`/products/${product.id}`}>{product.name}</Link>
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

            <h2 className="productsyr">Syrups</h2>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "syrup")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />
                      <Link className="productname1" to={`/products/${product.id}`}>{product.name}</Link>
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

            <h2 className="producttop">Toppings</h2>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "topping")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />
                      <Link className="productname1" to={`/products/${product.id}`}>{product.name}</Link>
                      <div className="teaprice">${product.price}</div>

                      <button
                        className="addtocart"
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
            
            <h2 className="milk">Milk Powder</h2>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "milk")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />

                      <Link className="productname1" to={`/products/${product.id}`}>{product.name}</Link>
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

            <h2 className="merch">BobaGirls Merch & Accessories</h2>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "merchandise")
                .map((product) => {
                  return (
                    <li className="teadiv" key={product.id}>
                      <img src={product.imageUrl} />

                      <Link className="productname1" to={`/products/${product.id}`}>{product.name}</Link>
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
            
            <Link to='/newproducts'>
              { user.isAdmin ? (
              <div className='admindelete'>
              <h5 className='admin'> Admin Only: </h5>
              <button className='admindeleteb'>Add New Product</button>
              </div>
              ) : null }
            </Link>
          </div>
          */}
      </div>
    );
  }
}

const mapState = ({ products, auth }) => {
  const user = auth
  return {
    products,
    user
  };
};

const mapDispatch = (dispatch, { history }) => {
  console.log("Dispatch")
  return {
    addToCart: (product, quantity) =>
      dispatch(addToCart(product, quantity, history)),
  };
};

export default connect(mapState, mapDispatch)(Products);
