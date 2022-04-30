import axios from 'axios'
import history from 'history'

const FETCH_CART = 'FETCH_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const _fetchCart = cart => {
  return {
    type: FETCH_CART,
    cart
  }
}

const _deleteFromCart = productId => ({ type: DELETE_FROM_CART, productId })
const _addToCart = productId =>({ type: ADD_TO_CART, productId})

// const _addToCart = cart => {
//   return {
//     type: ADD_TO_CART,
//     cart
//   }
// }

export const fetchCart = () => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.get('/api/cart', {
          headers: {
            authorization: token
          }
        })
        dispatch(_fetchCart(data))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const deleteFromCart = (productId, quantity, history) => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.delete(`/api/cart/${productId}/${quantity}`, {
          headers: {
            authorization: token
          }
        })
        dispatch(_deleteFromCart(data))
        history.push('/products')
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const addToCart = product => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.post('/api/cart', product, {
          headers: {
            authorization: token
          }
        })
        dispatch(_addToCart(data))
      }
    } catch(ex) {
      console.log(ex)
    }
  }
}

const cart = (state = [], action) => {
  if (action.type === FETCH_CART) {
    state = action.cart
  }
  if (action.type === DELETE_FROM_CART) {
    console.log("Action", action)
    const newState = [...state];
    newState[0].lineitems = state[0].lineitems.filter(lineitem => lineitem.id !== action.lineitem.id)
    console.log("New State", newState[0])
    return newState;
  }
  if (action.type === ADD_TO_CART) {
    console.log("Action", action)
    state = [...state, action.cart]
    console.log("New State", state)
  }
  return state
}

export default cart