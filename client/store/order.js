import axios from 'axios'

const FETCH_ORDER = 'FETCH_ORDER'

const _fetchOrder = order => ({
  type: FETCH_ORDER,
  order
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
    return action.order
  }
  return state
}

export default order