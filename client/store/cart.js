import axios from 'axios'

const FETCH_CART = 'FETCH_CART'

const _fetchCart = cart => {
  return {
    type: FETCH_CART,
    cart
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/cart')
      dispatch(_fetchCart(data))
    } catch (ex) {
      console.log(ex)
    }
  }
}

const cart = (state = [], action) => {
  if (action.type === 'FETCH_CART') {
    return action.cart
  }
  return state;
}

export default cart