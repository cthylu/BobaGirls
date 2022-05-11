import React from "react";
import { connect } from "react-redux";

const Order = ({ order }) => {
  return (
    <div className='ordersinfo'>
      <h2 className='product2'>Order Information:</h2>
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
            <td>Total</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapState = (state, otherProps) => {
  console.log(state.orders)
  const order = state.orders.filter(order => order.id === otherProps.match.params.id*1)
  return {
    order
  }
}

export default connect(mapState)(Order)

// export class SingleOrder extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//       this.props.fetchSingleOrder(this.props.match.params.id);
//   }

//   render() {
//     const { order } = this.props;
//     console.log(order, 'order')
//     return (
//       <div>
//         {
//           order.id
//         }
//       </div>
//       // <div className='orderdiv'>
//       //     <h2>Order Information: </h2>
//       //   {
//       //     order.map(line => {
//       //       return (
//       //         <div key={ line.id }>
//       //           <ul>
//       //             {
//       //               line.lineitems.map(item => {
//       //                 return (
//       //                   <div className='orderproducts' key={ item.id }>
//       //                     <li key={ item.imageUrl }>
//       //                       <img src={ item.product.imageUrl } />
//       //                     </li>
//       //                     <div className='ordername'>
//       //                       <li>Name:</li>
//       //                       <li>Quantity:</li>
//       //                       <li>Price:</li>
//       //                     </div>
//       //                     <div className='orderinfo'>
//       //                       <li key={ item.name }>
//       //                         { item.product.name }
//       //                       </li>
//       //                       <li key={ item.quantity }>
//       //                         { item.quantity }
//       //                       </li>
//       //                       <li key={ item.price }>
//       //                         ${item.product.price}
//       //                       </li>
//       //                     </div>
//       //                       <li key={ item.total }>
//       //                           Total: ${item.product.price * item.quantity}.00
//       //                       </li>
//       //                   </div>
//       //                 )
//       //               })
//       //             }
//       //           </ul>
//       //         </div>
//       //       )
//       //     })
//       //   }
//       // </div>
//     );
//   }
// }

// const mapState = (state) => {
//   // console.log(state.singleOrder.map(id => id.id), 'state')
//   return {
//     order: state.singleOrder.lineitems
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchSingleOrder: (orderId) =>
//       dispatch(fetchSingleOrder(orderId))
//   };
// };

// export default connect(mapState, mapDispatch)(SingleOrder);