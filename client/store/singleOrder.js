import axios from 'axios'

const FETCH_SINGLE_ORDER = 'FETCH_SINGLE_ORDER'

const _fetchSingleOrder = order => ({
  type: FETCH_SINGLE_ORDER,
  order
})

export const fetchSingleOrder = id => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: {
            authorization: token
          }
        })
        dispatch(_fetchSingleOrder(data))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

const initialState = {};

export default (state = initialState, action) => {
  if (action.type === FETCH_SINGLE_ORDER) {
    state = action.order
  }
  return state
}
