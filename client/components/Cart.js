import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { fetchCart } from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }
  
 async componentDidMount () {
    //  const token = window.localStorage.getItem('token')
    //  const cart = (await axios.get('/api/cart', { headers: {
    //     authorization: token
    //   }})).data  
    //  this.setState({cart})
    try {
      // const cart = this.props.fetchCart()
      // console.log(cart, 'fetchCart props')
      // this.setState( cart )

      // let test = (await axios.get('/api/cart', { headers: { authorization: token }})).data
      // this.setState({cart: test})
      // console.log(test, 'componentdidmount test')
      this.props.fetchCart()
    }
    catch(ex) {
      console.log(ex)
    }
  }
 render() {
    const { cart } = this.props
    // if (!cart.lineitems[0]) {
    //     console.log("No teas!");
    // }
    // else {
        // console.log(cart, "cost");
    // }
    // console.log(cart, 'render')
    return (
       <div>
          {
            cart.map(item => {
              return (
                <li key={item.id}>
                  {item.lineitems.map(line => line.tea.teaname)}
                </li>
              )
            })
          }  
       </div>
    )
 }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(state => state, mapDispatch)(Cart)