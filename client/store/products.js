import axios from "axios"

const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/products');
    dispatch({ type: SET_PRODUCTS, products: response.data })
  }
}

const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    return action.products
  }
  return state;
}

export default products