import axios from "axios"

const SET_PRODUCTS = "SET_PRODUCTS";

// Action creator
const _getProducts = (products) => {
  return { type: SET_PRODUCTS, products }
}

// Thunk
export const fetchProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get('/api/products')).data;
    dispatch(_getProducts(products));
  }
}

const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    //console.log(action.products);
    return action.products
  }
  return state;
}

export default products;