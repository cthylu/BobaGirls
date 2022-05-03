import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";

//const Products = ({ products, addProductToCart }) => {
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart(product) {
    const lineitem = {
      quantity: 1,
      cost: product.price,
      productId: product.id,
      orderId: 1,
    };
    this.props.addItemToCart(lineitem);
  }

  render() {
    const { products } = this.props;
    return (
      <div className="content">
        <h2>Products</h2>
        {products ? (
          <ul className="teaproducts">
            {products.map((product) => {
              return (
                <li className="teadiv" key={product.id}>
                  <img src={product.imageUrl} />

                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                  <div className="teaprice">${product.price}</div>
                  <button
                    id="addtocart"
                    onClick={() => this.addProductToCart(product)}
                  >
                    Add To Cart
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No products</p>
        )}
      </div>
    );
  }
}

const mapState = ({ products }) => {
  return {
    products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItemToCart: (product) => {
      return dispatch(addToCart(product));
    },
  };
};

export default connect(mapState, mapDispatch)(Products);
