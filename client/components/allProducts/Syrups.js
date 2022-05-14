import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "/client/store";

const Syrups = ({ products, addProductToCart }) => {
  return (
    <div className="content">
     <h2 className="productsyr">Boba Girls Syrups</h2>

      {
        <div>
            <ul className="items-list">
              {products
              .filter((product) => product.key === "syrup")
              .map((product) => {
                  return (
                  <li className="item-container" key={product.id}>
                      <div className="item-image"><img src={product.imageUrl} /></div>
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
        </div>
      }
    </div>
  );
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

export default connect(mapState, mapDispatch)(Syrups);
