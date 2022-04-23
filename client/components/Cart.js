import React from 'react';

import { connect } from 'react-redux'
import axios from 'axios';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }
  
 async componentDidMount () {
     const token = window.localStorage.getItem('token')
     const cart = (await axios.get('/api/cart', { headers: {
        authorization: token
      }})).data  
     this.setState({cart})
     
 }
 render() {
    const { cart } = this.state
    // if (!cart.lineitems[0]) {
    //     console.log("No teas!");
    // }
    // else {
        console.log(cart.lineitems, "cost");
    // }
    return (
       <div>
          {
            cart.id
          } 
       </div>
    )
 }
}


export default connect(state => state)(Cart)