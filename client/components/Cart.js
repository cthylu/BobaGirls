import React, { Component } from "react";
import { connect } from "react-redux";
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
        <h2>Cart:</h2>
        {cart.map((item) => {
          return (
            <div key={item.id}>
              <table>
                <tbody>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                  </tr>
                  {
                  item.lineitems.map((line) => {
                    return (
                      <tr key={line.id}>
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
                          {" "}
                          Remove{" "}
                        </button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
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
