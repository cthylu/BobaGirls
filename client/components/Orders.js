import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchOrder } from '../store'

class Orders extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentDidMount () {
    try {
      // forgot to pass in user id
      await this.props.fetchOrder(this.props.auth.id)
    }
    catch(ex) {
      next(ex)
    }
  }
  render() {
    const { order, auth } = this.props
    return (
      <div className='ordersinfo'>
        <h2>Orders for { auth.username.slice(0, 1).toUpperCase() }{ auth.username.slice(1) }:</h2>
        {
          order.map(orders => {
            // STANNIE:: i hope the user's cart isnt being displayed here- because i think in our setup, carts and orders are the same database model
            return (
              <div key={ orders.id }>
                <Link to={`/order/${ orders.id }`}>
                  Ordered on: {orders.createdAt.slice(0, 10)}
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => state;

const mapDispatch = (dispatch) => ({
    fetchOrder: (userId) => dispatch(fetchOrder(userId)),
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