import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, deleteFromCart } from "../store/cart";

class Cart extends Component {
  constructor() {
    super();
    this.cartTotal = 0;
    this.getCartTotal = this.getCartTotal.bind(this);
    this.getSalesTax = this.getSalesTax.bind(this);

  }
  // componentDidMount() {
  //   this.props.fetchCart();
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.products !== prevProps.products) {
  //     this.props.fetchCart();
  //   }
  // }

  getCartTotal() {
    const lineitems = this.props.cart.lineitems
    const cartTotal = lineitems &&
      lineitems.reduce((acc, item) => {
        acc += (item.quantity * item.product?.price)
        return acc
      }, 0)
    return (cartTotal*1);
  }

  getSalesTax() {
    const tax = Math.round((this.getCartTotal() * 0.0875)*100)/100
    return (tax*1)
  }

  render() {
    const { cart, user } = this.props;
    console.log(user, 'user', cart, 'cart')
    const { getCartTotal, getSalesTax } = this;
    return (
      <div className="content cart">
        {
          user.id === undefined &&
          <h2 className='product2'>CLICK <Link to='/signup'>HERE</Link> TO CREATE AN ACCOUNT</h2>
        }
        { user.id === cart.userId &&
        cart.lineitems?.length === 0 ? <h2 className='product2'>YOUR SHOPPING BAG IS EMPTY</h2> : 
        <div>
        <h1 className='cart1'>Shopping Cart</h1>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Qty</th>
              <th>Cost</th>
              <th>Total Cost</th>
            </tr>
            {cart.lineitems?.map((line) => {
              return (
                <tr key={line.id} className="cart-table">
                  <td>
                    <img src={line.product?.imageUrl} />
                  </td>
                  <td>{line.product?.name}</td>
                  <td>{line.quantity}</td>
                  <td>${line.product?.price}</td>
                  <td>${(line.product?.price * line.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="delete"
                      type="delete"
                      onClick={() =>
                        this.props.deleteLineitem(line.id, line.quantity)
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table className='cartcheckout'>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${getCartTotal().toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>Sales Tax</td>
              <td>${getSalesTax().toFixed(2)}</td>
            </tr>
            <tr>
              <td>Estimated Total</td>
              <td>${(getSalesTax() + getCartTotal()).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button className='addtocart'>
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
        
        
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.auth
  }
};

const mapDispatch = (dispatch) => ({
  // fetchCart: () => dispatch(fetchCart()),
  deleteLineitem: (lineId, lineQuantity) =>
    dispatch(deleteFromCart(lineId, lineQuantity)),
});

export default connect(mapState, mapDispatch)(Cart);
