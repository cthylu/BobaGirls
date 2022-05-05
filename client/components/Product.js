import React from "react";
import { connect } from "react-redux";
import { addToCart, deleteProduct } from "../store";

const Product = ({ product, user }) => {
  return (
    <div>
      {
        <div className="teainfo">
          <img src={product.imageUrl} />
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h5>Quantity: { product.quantity } in stock</h5>

            <button className="addtocart" onClick={() => addToCart(product)}>
              Add To Cart
            </button>
          </div>
          { user.isAdmin ? (
            <button onClick={() => this.props.deleteProduct(product.id)}>Remove Product</button>
          ) : null }
        </div>
      }
    </div>
  )
}

const mapState = (state, otherProps) => {
  const product = state.products.find(product => product.id === otherProps.match.params.id*1) || {};
  const user = state.auth
    return {
      product,
      user
    }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};


export default connect(mapState, mapDispatch)(Product)

// export class SingleProduct extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     this.props.fetchSingleProduct(this.props.match.params.id);
//   }

//   render() {
//     const { product, user } = this.props;
//     return (
//       <div>
//         {
//           <div className="teainfo">
//             <img src={product.imageUrl} />
//             <div>
//               <h2>{product.name}</h2>
//               <p>{product.description}</p>
//               <h5>Quantity: { product.quantity } in stock</h5>

//               <button className="addtocart" onClick={() => addToCart(product)}>
//                 Add To Cart
//               </button>
//             </div>
//             { user.isAdmin ? (
//               <button onClick={() => this.props.deleteProduct(product.id)}>Remove Product</button>
//             ) : null }
//           </div>
//         }
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     product: state.singleProduct,
//     user: state.auth
//   };
// };

// const mapDispatch = (dispatch, { history }) => {
//   return {
//     fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId, history)),
//     deleteProduct: (product) => dispatch(deleteProduct(product)),
//   };
// };

// export default connect(mapState, mapDispatch)(SingleProduct);

