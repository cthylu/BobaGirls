import axios from "axios";
import history from "history";

const FETCH_CART = "FETCH_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";

const _fetchCart = (cart) => ({
  type: FETCH_CART,
  cart,
});

const _deleteFromCart = (lineitem) => ({
  type: DELETE_FROM_CART,
  lineitem,
});

const _addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(_fetchCart(data));
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const deleteFromCart = (lineitemId, quantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.delete(
          `/api/cart/${lineitemId}/${quantity}`,
          { headers: { authorization: token } }
        );
        dispatch(_deleteFromCart(data));
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

// export const addToCart = (productId ) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem(TOKEN);

//       const { data: productToAdd } = await axios.get(
//         `/api/products/${productId}`
//       );

//       let { id } = productToAdd;

//       if (token) {
//         const res = await axios.get("/auth/me", {
//           headers: {
//             authorization: token,
//           },
//         });

//         const { data: order } = await axios.post(
//           `/api/cart`,
//           { quantity: newQuantity },
//           {
//             headers: {
//               authorization: token,
//             },
//           }
//         );
//       }
//       return dispatch(_addProduct(order));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

export const addToCart = (product, quantity, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.post(
          `/api/cart`, { product, quantity },
          { headers: { authorization: token } }
        );
        dispatch(_addToCart(data));
      }
    } catch (ex) {
      console.log(ex);
    }ç
  };
};

// export const addToCart = (product, quantity, history) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem("token");
//       if (token) {
//         const { data } = await axios.post("/api/cart", product, {
//           headers: { authorization: token },
//         });
//         dispatch(_addToCart(data));
//       }
//     } catch (ex) {
//       console.log(ex);
//     }
//   };
// };

const cart = (state = [], action) => {
  if (action.type === FETCH_CART) {
    return action.cart;
  }
  if (action.type === DELETE_FROM_CART) {
    console.log("Action", action);
    const newState = [...state];
    newState[0].lineitems = state[0].lineitems.filter(
      (lineitem) => lineitem.id !== action.lineitem.id
    );
    console.log("New State", newState[0]);
    return newState;
  }
  if (action.type === ADD_TO_CART) {
    console.log("Action", action);
    const newState = [...state, action.cart];
    console.log("New State", newState);
    return newState;
  }
  return state;
};

export default cart;
