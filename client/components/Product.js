import React from 'react';
import { connect } from 'react-redux';

const Product = ({ product }) => {
  return (
     <div>
        {
            <div className='teainfo'>
                <img src={product.imageUrl} />
                <div>
                    <h2>{ product.teaname }</h2>
                    <p>
                        { product.description }
                    </p>
                    <h5>Quantity: { product.quantity } in stock</h5>

                    <button className='addtocart'>Add To Cart</button>
                </div>
            </div>
        }
     </div>
  )
}

const mapState = (state, otherProps) => {
    const product = state.product.find(product => product.id === otherProps.match.params.id*1) || {};
    return {
        product
    }
}

export default connect(mapState)(Product)