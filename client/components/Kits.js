import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store";

class Kits extends Component {
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart(product) {
    const quantity = 1;
    this.props.addToCart(product, quantity);
  }

  render() {
    const { products, user } = this.props;
    const { addProductToCart } = this;
    return (
      <div className="content">
        <h1>Boba Girls Bubble Tea Kits</h1>
        <br/>
        <div className='kitdiv'>
            <p className='kit-title'>BUBBLE TEA DIY KIT</p>
            <p>(Each cup serves 400ml)</p>
        </div>
        {
        <div>
            <ul className="teaproducts">
              {products
                .filter((product) => product.key === "kit")
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
          <div>
          <ul>THINGS TO INDICATE UPON CHECKOUT:
              <li>Choice of tea leaves (Oolong / Green / Jasmine / Rose)</li> 
              <li>Choice of fruit syrup (Peach / Lychee / Passionfruit) (if applicable)</li> 
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
    addProductToCart: (product) => dispatch(addToCart(product, history)),
  };
};

export default connect(mapState, mapDispatch)(Kits);
