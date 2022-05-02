import React from "react";
import { connect } from "react-redux";
import { addToCart, fetchSingleProduct, deleteProduct } from "../store";


export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  render() {
    const { product, user } = this.props;
    console.log(user)
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
              <button onClick={() => this.props.deleteProduct(product.id)}>Remove Plant</button>
            ) : null }
          </div>
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    user: state.auth,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId, history)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);

// const Product = ({ product }) => {
//   return (
//      <div>
//         {
//             <div className='teainfo'>
//                 <img src={product.imageUrl} />
//                 <div>
//                     <h2>{ product.teaname }</h2>
//                     <p>
//                         { product.description }
//                     </p>
//                     <h5>Quantity: { product.quantity } in stock</h5>

//                     <button className='addtocart'>Add To Cart</button>
//                 </div>
//             </div>
//         }
//      </div>
//   )
// }

// const mapState = (state, otherProps) => {
//   const product = state.product.find(product => product.id === otherProps.match.params.id*1) || {};
//     return {
//       product
//     }
// }

// export default connect(mapState)(Product)
