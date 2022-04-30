import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store';

const Products = (props) => {
  const { products } = props;
  //console.log('props', products);
  return (
    <div className='content'>
      <h2>Products</h2>
      {
        products ? (
        <ul className='teaproducts'>
          {
            products.map(product => {
              return (
                <li className='teadiv' key={product.id}>
                  <img src={product.imageUrl} />
                  <Link to={`/product/${ product.id }`}>
                    { product.name }
                  </Link>
                  <div className='teaprice'>
                    ${product.price}
                  </div>
                  <button id='addtocart' onClick={() => props.addProductToCart(product)}>Add To Cart</button>
                </li>
              )
            })
          }
      </ul>
      ) : (
        <p>No products</p>
      )
      }
    </div>
  )
}

const mapState = ({ products }) => {
  return {
    products
  }
}

const mapDispatch = dispatch => {
  return {
    addProductToCart: (product) => {
      return dispatch(addToCart(product))
    }
  }
}

export default connect(mapState, mapDispatch)(Products);
