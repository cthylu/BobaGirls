import axios from 'axios'

const FETCH_ORDER = 'FETCH_ORDER'
// const FETCH_SINGLE_ORDER = 'FETCH_SINGLE_ORDER'

const _fetchOrder = order => ({
  type: FETCH_ORDER,
  order
})

// const _fetchSingleOrder = order => ({
//   type: FETCH_SINGLE_ORDER,
//   order
// })


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

// export const fetchSingleOrder = id => {
//   return async dispatch => {
//     try {
//       const token = window.localStorage.getItem('token')
//       if (token) {
//         const { data } = await axios.get(`/api/orders/${id}`, {
//           headers: {
//             authorization: token
//           }
//         })
//         dispatch(_fetchSingleOrder(data))
//       }
//     } catch (ex) {
//       console.log(ex)
//     }
//   }
// }



const order = (state = [], action) => {
  if (action.type === FETCH_ORDER) {
    return action.order
  }
  // if (action.type === FETCH_SINGLE_ORDER) {
  //   state = action.order
  // }
  return state
}

export default order