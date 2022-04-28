import axios from "axios"

const SET_PRODUCTS = 'SET_PRODUCTS'

const _fetchProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(_fetchProducts(data))
    } catch (ex) {
      console.log(ex)
    }
  }
}

const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    return action.products
  }
  return state;
}

export default products