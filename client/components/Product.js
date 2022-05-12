import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, deleteProduct } from "../store";
import { Link, Route } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import Kit from '/client/components/allProducts/Kit.js'


class Product extends Component {
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
    const { product, user } = this.props;
    const { addProductToCart, deleteProduct } = this;
    return (
      <div>
        { 
          <div className="teainfo">
            <img src={product.imageUrl} />
            <div>
              <h2 className="producttitle">{product.name}</h2>
              <div className="productinfo1">
              <p className="productdes">{product.description}</p>
              <p className="productpr">${product.price}</p>
              <h5 className="prodquantity">Quantity: {product.quantity} in stock</h5>
              </div>
              <div>
                { product.key === 'kit' ? <Route component={Kit} product={product} addProductToCart={this.addProductToCart} /> : null } 
              </div>

              {
                product.key !== 'kit' &&
                  <button
                    className="addtocart"
                    onClick={() => addProductToCart(product)}
                    >
                    Add To Cart
                  </button>
              }

            <div> <Route component={UpdateProduct}/> 
            <Link to='/products'>
            { user.isAdmin ? (
              <div className='admindelete'>
              <h5 className='admin'> Admin Only: </h5>
              <button className='admindeleteb' onClick={() => deleteProduct(product.id)}>Remove Product</button>
              </div>
            ) : null }
            </Link>
            </div>
            </div>
            {/* <Link to='/products'>
            { user.isAdmin ? (
              <div className='admindelete'>
              <h5 className='admin'> Admin Only: </h5>
              <button className='admindeleteb' onClick={() => deleteProduct(product.id)}>Remove Product</button>
              </div>
            ) : null }
            </Link> */}
          </div>
        }
      
      </div>
    );
  }
}

const mapState = (state, otherProps) => {
  const product =
    state.products.find(
      (product) => product.id === otherProps.match.params.id * 1
    ) || {};
  const user = state.auth;
  return {
    product,
    user,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProduct(productId, history)),
    addToCart: (product, quantity) =>
      dispatch(addToCart(product, quantity, history)),  
  };
};

export default connect(mapState, mapDispatch)(Product);