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
    console.log(cart.lineitems)
    return (
       <div>
          {
            cart.id
          } 
       </div>
    )
 }
}

// mapStatetoProps = (state, { match }) => {
//     const = ()
// }

export default connect(state => state)(Cart)