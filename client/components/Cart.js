import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { fetchCart, deleteFromCart } from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
    //this.deleteCartItem = this.bind(this.delete)
  }
  
  async componentDidMount () {
    this.props.fetchCart()
  }

  deleteCartItem () {
    console.log("Cart!!!!");
  }

  render() {
    const { cart } = this.props
    console.log('cart', cart);
    return (
      <div>
          {
            cart.map(item => {
              console.log('order', item);
              return (
                  <div key={item.id}>
                    <ul>{
                      item.lineitems.map(line => {
                        return (
                          <li>{line.product.name}({line.quantity})
                            <button className='delete' type='delete' onClick={() => this.props.deleteProduct(line.id, line.quantity)} > Delete </button>
                          </li>
                        )
                      })
                    }
                    </ul>
                  </div>
              )
            })
          }  
      </div>
    )
  }
}

const mapState = (state) => state;

const mapDispatch = (dispatch) => ({
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    deleteProduct: (tea, quantity) => dispatch(deleteFromCart(tea, quantity))
})

export default connect(mapState, mapDispatch)(Cart)