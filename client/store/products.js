import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

// Action creator
const _getProducts = (products) => {
  return { type: SET_PRODUCTS, products };
};

const _removeProduct = (productId) => {
  return {
    type: REMOVE_PRODUCT,
    productId,
  };
};

// Thunk
export const fetchProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch(_getProducts(products));
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.delete(`/api/products/${productId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_removeProduct(data));
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    return action.products;
  }
  if (action.type === REMOVE_PRODUCT) {
    return state.filter((product) => product.id !== action.product.id);
  }
  return state;
};

export default products;
