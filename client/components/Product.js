import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, deleteProduct } from "../store";
import { Link } from "react-router-dom";



const SingleProduct = ({product, user}) => {
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
            <div className='admindelete'>
            <div className='admin'> Admin Only: </div>
            { user.isAdmin && (
              <Link to={`/products`}>
              <button onClick={() => deleteProduct(product.id)}>Remove Product</button>
              </Link>
            )}
            </div>
          </div>
        }
      </div>
    );
}

const mapState = (state, otherProps) => {
  const product = state.products.find(product => product.id === otherProps.match.params.id*1) || {};
  const user = state.auth
    return {
      product,
      user
    }
}

const mapDispatch = (dispatch, { history }) => ({
    deleteProduct: (productId) => dispatch(deleteProduct(productId, history))
  });
;

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
