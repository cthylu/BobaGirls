import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../store";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.auth.id);
  }

  render() {
    const { orders, auth } = this.props;
    return (
      <div className="ordersinfo">
        { orders.length === 0 ? 
          <div>
            <h2 className='product2'>No Order History</h2> 
            <h2><Link to="/products">Start Shopping </Link></h2>
          </div>
        :
        <div>
          <h2 className='product2'>Order History</h2>
            <table className='panel'>
              <tbody>
                <tr>
                  <th>Purchase Date</th>
                  <th>Order No.</th>
                  <th>Items</th>
                </tr>
                  {orders.map((order) => {
                    return (
                      <tr key= {order.id }>
                        <td> {order.time}</td>
                        <td>
                          <Link to={`/order/${order.id}`}>
                            000{order.id}
                          </Link>
                        </td>
                        <td>{order.lineitems?.length}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

const mapState = ({ orders, auth }) => {
  return {
    orders,
    auth,
  };
};

const mapDispatch = (dispatch) => ({
  fetchOrders: (userId) => dispatch(fetchOrders(userId)),
});

export default connect(mapState, mapDispatch)(Orders);