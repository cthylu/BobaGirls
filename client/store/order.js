import axios from 'axios'

const FETCH_ORDER = 'FETCH_ORDER'

const _fetchOrder = orders => ({
  type: FETCH_ORDER,
  orders
})

export const fetchOrder = () => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.get('/api/orders', {
          headers: {
            authorization: token
          }
        })
        dispatch(_fetchOrder(data))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

const order = (state = [], action) => {
  if (action.type === FETCH_ORDER) {
    return action.orders
  }
  return state
}

export default order