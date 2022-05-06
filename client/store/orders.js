import axios from 'axios'

const FETCH_ORDERS = 'FETCH_ORDERS'

const _fetchOrders = orders => ({
  type: FETCH_ORDERS,
  orders
})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.get('/api/orders', {
          headers: {
            authorization: token
          }
        })
        dispatch(_fetchOrders(data))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

const orders = (state = [], action) => {
  if (action.type === FETCH_ORDERS) {
    return action.orders
  }
  return state
}

export default orders