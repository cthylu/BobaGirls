import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchCart, deleteFromCart } from "../store/cart";

class Cart extends Component {
  async componentDidMount() {
    this.props.fetchCart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.props.fetchCart();
    }
  }
  
  render() {
    const { cart } = this.props;
    return (
      <div className="cart-container">
        {cart.map((item) => {
          return (
            <div key={item.id}>
              <h2>Cart:</h2>
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                  </tr>
                  {
                  item.lineitems.map((line) => {
                    return (
                      <tr key={line.id} className='cart-table'>
                        <td><img src={line.product?.imageUrl} /></td>
                        <td>{line.product?.name}</td>
                        <td>{line.quantity}</td>
                        <td>{line.cost}</td>
                        <td><button
                          className="delete"
                          type="delete"
                          onClick={() =>
                            this.props.deleteLineitem(line.id, line.quantity)
                          }
                        >
                          Remove
                        </button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
        <div className='cartcheckout'>
          <h2>Cart Total</h2>
          <ul>
            <li>Quantity:</li>
            <li>Total:</li>
          </ul>
          <button>
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
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
