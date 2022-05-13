import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, deleteFromCart } from "../store/cart";

class Cart extends Component {
  constructor() {
    super();
    this.cartTotal = 0;
    this.getCartTotal = this.getCartTotal.bind(this);
  }
  componentDidMount() {
    this.props.fetchCart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.props.fetchCart();
    }
  }

  getCartTotal() {}

  render() {
    const { cart } = this.props;
    return (
      <div className="content cart">
        { cart.lineitems?.length === 0 ? <h2 className='product2'>YOUR SHOPPING BAG IS EMPTY</h2> : 
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
                  <td>${line.cost}</td>
                  <td>${line.cost * line.quantity}</td>
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
              <td></td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>Sales Tax</td>
              <td>$2.00</td>
            </tr>
            <tr>
              <td>Estimated Total</td>
              <td></td>
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

const mapState = (state) => state;

const mapDispatch = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteLineitem: (lineId, lineQuantity) =>
    dispatch(deleteFromCart(lineId, lineQuantity)),
});

export default connect(mapState, mapDispatch)(Cart);
