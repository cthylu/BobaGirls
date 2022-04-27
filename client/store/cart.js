import axios from 'axios'

const FETCH_CART = 'FETCH_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const _fetchCart = cart => {
  return {
    type: FETCH_CART,
    cart
  }
}

const _deleteFromCart = teaId => {
  return {
    type: DELETE_FROM_CART,
    teaId
  }
}

const _addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

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
        // console.log(data, 'fetchCart data')
        dispatch(_fetchCart(data))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const deleteFromCart = teaId => {
  return async dispatch => {
    try {
      await axios.delete('/api/cart', { data: { teaId: teaId } })
      dispatch(_deleteFromCart(teaId))
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const addToCart = teaId => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/cart', {teaId: teaId})
      dispatch(_addToCart(data))
    } catch(ex) {
      console.log(ex)
    }
  }
}

const cart = (state = [], action) => {
  if (action.type === 'FETCH_CART') {
    state = action.cart
  }
  if (action.type === 'DELETE_FROM_CART') {
    state = state.filter(tea => tea.id !== action.tea)
  }
  if (action.type === ADD_TO_CART) {
    state = [...state, action.cart]
  }
  return state
}

export default cart