import React, { Component } from "react";
import { connect } from "react-redux";

class Order extends Component {
  constructor() {
    super()
    this.cartTotal = 0;
    this.getCartTotal = this.getCartTotal.bind(this);
    this.getSalesTax = this.getSalesTax.bind(this);
  }

  getCartTotal() {
    const lineitems = this.props.order.map(order => order.lineitems)
    console.log(lineitems, 'getcartotal')
    console.log(lineitems.map(item => item.quantity), 'quantity 1')
    // const cartTotal = lineitems &&
    //   lineitems.reduce((acc, item) => {
    //     console.log(item.quantity, 'quantity')
    //     acc += (item.quantity * item.product?.price)
    //     return acc
    //   }, 0)
    // console.log(cartTotal, 'cartottal')

    // const lineitems = this.props.cart.lineitems
    // const cartTotal = lineitems &&
    //   lineitems.reduce((acc, item) => {
    //     acc += (item.quantity * item.product?.price)
    //     return acc
    //   }, 0)
    // return (cartTotal*1);
  }

  getSalesTax() {
    const tax = Math.round((this.getCartTotal() * 0.0875)*100)/100
    return (tax*1)
  }

  render() {
    const { order } = this.props;
    const { getCartTotal, getSalesTax } = this;
    return (
      <div className='ordersinfo'>
        <h2 className='product2'>Order Information</h2>
          {order.map((item) => {
              return (
                <table className='content-order' key={item.id}>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>QTY</th>
                      <th>Cost</th>
                      <th>Total Cost</th>
                    </tr>
                    {
                      item.lineitems.map((line => {
                        return (
                          <tr key={line.id}>
                            <td><img src={line.product.imageUrl} /></td>
                            <td>{line.product?.name}</td>
                            <td>{line.quantity}</td>
                            <td>{line.product.price}</td>
                            <td>${line.product.price * line.quantity}</td>
                          </tr>
                        )
                    }))
                  }
                </tbody>
              </table>
            );
        })}
        <table className='cartcheckout'>
          <tbody>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>Sales Tax</td>
              <td>{getCartTotal()}</td>
              {/* <td>${getSalesTax().toFixed(2)}</td> */}
            </tr>
            <tr>
              <td>Total</td>
              {/* <td>${(getSalesTax() + getCartTotal()).toFixed(2)}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = (state, otherProps) => {
  const order = state.orders.filter(order => order.id === otherProps.match.params.id*1)
  return {
    order,
  }
}

export default connect(mapState)(Order)