import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart} from '../store/cart'

const Products = ({ products, addProduct }) => {
  return (
    <div className='content'>
      <h2>Products</h2>
      {
        <div>
          <h2>Teas:</h2>
            <ul className='teaproducts'>
              {
                products.filter(product => product.key === 'tea').map(product => {
                  return (
                    <li className='teadiv' key={ product.id }>
                      <img src={product.imageUrl} />

                      <Link to={`/products/${ product.id }`}>
                        { product.name }
                      </Link>
                      <div className='teaprice'>
                        ${ product.price }
                      </div>

                      <button id='addtocart' type='add' onClick={() => addProduct((Math.random()))}>Add To Cart</button>
                    </li>
                  )
                })
              }
          </ul>
          <h2>Toppings:</h2>
            <ul className='teaproducts'>
              {
                products.filter(product => product.key === 'topping').map(product => {
                  return (
                    <li className='teadiv' key={ product.id }>
                      <img src={product.imageUrl} />

                      <Link to={`/products/${ product.id }`}>
                        { product.name }
                      </Link>
                      <div className='teaprice'>
                        ${ product.price }
                      </div>

                      <button id='addtocart' type='add' onClick={() => addProduct((Math.random()))}>Add To Cart</button>
                    </li>
                  )
                })
              }
            </ul>

            <h2>Merchandise:</h2>
            <ul className='teaproducts'>
              {
                products.filter(product => product.key === 'merchandise').map(product => {
                  return (
                    <li className='teadiv' key={ product.id }>
                      <img src={product.imageUrl} />

                      <Link to={`/products/${ product.id }`}>
                        { product.name }
                      </Link>
                      <div className='teaprice'>
                        ${ product.price }
                      </div>

                      <button id='addtocart' type='add' onClick={() => addProduct((Math.random()))}>Add To Cart</button>
                    </li>
                  )
                })
              }
            </ul>
        </div>
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
