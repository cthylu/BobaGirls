import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart} from '../store/cart'


const Products = ({ products, addProduct }) => {
  //console.log('products', products);
  return (
    <div className='content'>
      <h2>Products</h2>
      {
        products ? (
        <ul className='teaproducts' >
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

                  <button id='addtocart' type='add' onClick={() => addProduct(console.log('works'))}>Add To Cart</button>
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

const mapDispatch = (dispatch, {history}) => ({
      addProduct: (productId) => dispatch(addToCart(productId, history))
    })




export default connect(mapState, mapDispatch)(Products);
