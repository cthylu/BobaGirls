import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store";

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
                        <li className='orderproducts' key={ item.id }>
                          <img src={ item.product.imageUrl } />
                          { item.product.name } ({ item.quantity })
                        </li>
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