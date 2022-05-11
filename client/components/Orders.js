import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../store";

class Orders extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      // forgot to pass in user id
      await this.props.fetchOrders(this.props.auth.id);
    } catch (ex) {
      next(ex);
    }
  }
  render() {
    const { orders, auth } = this.props;
    console.log("orders", orders);
    return (
      <div className="ordersinfo">
        <h2>
          Orders for {auth.username.slice(0, 1).toUpperCase()}
          {auth.username.slice(1)}:
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Purchase Date</th>
              <th>Order No.</th>
            </tr>
            {orders.map((order) => {
              // STANNIE:: i hope the user's cart isnt being displayed here- because i think in our setup, carts and orders are the same database model
              return (
                <tr key={order.id}>
                  <td>{order.createdAt.slice(0,10)}</td>
                  <td>
                    <Link to={`/order/${order.id}`}>
                      Order #{order.id}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

// import React from 'react';
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom';

// const Orders = ({ order, auth }) => {
//   return (
//     <div>
//       <h2>Orders for { auth.username.slice(0, 1).toUpperCase() }{ auth.username.slice(1) }:</h2>
//       {
//         order.map(item => {
//           return (
//             <div key={ item.id }>
//               Order #{order.length} {item.createdAt.slice(0, 9)}
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// }

// const mapState = ({ order, auth }) => {
//   return {
//     order,
//     auth
//   }
// };

// export default connect(mapState)(Orders)
