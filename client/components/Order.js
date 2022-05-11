import React from "react";
import { connect } from "react-redux";

const Order = ({ order }) => {
  return (
    <div className='order-page'>
      <h2>Order Information:</h2>
      {
        order.map((item) => {
          return (
            <div key={item.id}>
              {
                item.lineitems.map((line) => {
                  return (
                    <div className='orderdiv' key={ line.id }>
                      <img src={line.product.imageUrl} />
                      <ul className='orderinfoname'>
                        <li>Name:</li>
                        <li>Quantity:</li>
                        <li>Cost:</li>
                      </ul>
                      <ul className='orderinfo'>
                        <li>{line.product?.name}</li>
                        <li>{line.quantity}</li>
                        <li>${line.product.price}</li>
                      </ul>
                      <div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
      <h3>Total Cost:</h3>
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