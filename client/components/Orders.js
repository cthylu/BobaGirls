import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchOrder } from '../store'

class Orders extends Component {
  componentDidMount () {
    this.props.fetchOrder()
  }

  render() {
    const { order, auth } = this.props
    return (
      <div className='ordersinfo'>
        <h2>Orders for { auth.username.slice(0, 1).toUpperCase() }{ auth.username.slice(1) }:</h2>
        {
          order.map(orders => {
            return (
              <div key={ orders.id }>
                <Link to={`/order/${ orders.id }`}>
                  Ordered on: {orders.id}
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapState = ({ order, auth }) => {
  return {
    order, auth
  }
}

const mapDispatch = (dispatch) => ({
    fetchOrder: (orderId) => dispatch(fetchOrder(orderId)),
})

export default connect(mapState, mapDispatch)(Orders)

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