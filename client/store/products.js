import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const ADD_PRODUCT = 'ADD_PRODUCT';


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

const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  }
}



// Thunk
export const fetchProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch(_getProducts(products));
  };
};

export const deleteProduct = (productId, lineitem, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        await axios.delete(`/api/products/${productId}`,  {
          headers: {
            authorization: token,
          },
        })
        dispatch(_removeProduct(productId, history));
        history.push('/products')
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};


export const addNewProduct = product => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if(token) {
        const { data } = await axios.post('/api/products', product, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_addProduct(data))
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}


const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    return action.products;
  }
  if (action.type === REMOVE_PRODUCT) {
    return [...state.filter((product) => product.id !== action.productId)];
  }
  if (action.type === ADD_PRODUCT) {
    return [...state, action.product]
  }
  return state;
};

export default products;
