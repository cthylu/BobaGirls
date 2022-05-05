import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store";
// STANNIE: you dont need this (check my comment in store/index.js

export class SingleOrder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchSingleOrder(this.props.match.params.id);
  }

  render() {
    const { order } = this.props;
    return (
      <div className='orderdiv'>
          <h2>Order Information: </h2>
        {
          order.map(line => {
            return (
              <div key={ line.id }>
                <ul>
                  {
                    line.lineitems.map(item => {
                      return (
                        <div className='orderproducts' key={ item.id }>
                          <li key={ item.imageUrl }>
                            <img src={ item.product.imageUrl } />
                          </li>
                          <div className='ordername'>
                            <li>Name:</li>
                            <li>Quantity:</li>
                            <li>Price:</li>
                          </div>
                          <div className='orderinfo'>
                            <li key={ item.name }>
                              { item.product.name }
                            </li>
                            <li key={ item.quantity }>
                              { item.quantity }
                            </li>
                            <li key={ item.price }>
                              ${item.product.price}
                            </li>
                          </div>
                            <li key={ item.total }>
                                Total: ${item.product.price * item.quantity}.00
                            </li>
                        </div>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.singleOrder
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleOrder: (orderId) =>
      dispatch(fetchSingleOrder(orderId))
  };
};

export default connect(mapState, mapDispatch)(SingleOrder);