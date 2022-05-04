import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
// const ADD_TO_CART = "ADD_TO_CART";

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

// const _addToCart = (cart) => ({
//   type: ADD_TO_CART,
//   cart,
// });

// Thunk
export const fetchProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch(_getProducts(products));
  };
};

export const deleteProduct = (productId, history) => {
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
        history.push('/products')
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

// export const addProduct = (product, history ) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem('token');
//       if (token) {
//         const { data } = await axios.post('/api/products', { product }, {
//           headers: {
//             authorization: token
//           }
//         });
//         dispatch(_addToCart(data));

//       }
//     } catch (e) {
//       console.error('error', e);
//     }
//   };
// }

const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    return action.products;
  }
  if (action.type === REMOVE_PRODUCT) {
    return state.filter((product) => product.id !== action.product.id);
  }
  //   if (action.type === ADD_TO_CART) {
  //   console.log("Action", action);
  //   const newState = [...state, action.cart];
  //   console.log("New State", newState);
  //   return newState; 
  // }
  return state;
};

export default products;
