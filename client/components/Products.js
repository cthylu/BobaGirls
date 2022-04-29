import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ({ products }) => {
  //console.log('products', products);
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
                  { product.teaname }
                  </Link>
                  <div className='teaprice'>
                    ${product.price}
                  </div>

                  <button id='addtocart'>Add To Cart</button>
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

export default connect(mapState)(Products);
