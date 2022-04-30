import axios from 'axios'

const FETCH_CART = 'FETCH_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const _fetchCart = cart => ({
  type: FETCH_CART,
  cart
})

const _deleteFromCart = lineitem => ({ 
  type: DELETE_FROM_CART, 
  lineitem 
})

const _addToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

export const fetchCart = () => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.get('/api/orders', {   // Cart is an array of orders where isCart is true, which should be only 1
          headers: {
            authorization: token
          }
        })
        const cart = data.filter((order) => order.isCart === true)
        //console.log("thunk cart", cart)
        dispatch(_fetchCart(cart))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const deleteFromCart = (lineitemId, quantity) => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.delete(`/api/cart/${lineitemId}/${quantity}`, 
        { headers: { authorization: token } })
        dispatch(_deleteFromCart(data))
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
        const { data } = await axios.post('/api/cart', product)
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