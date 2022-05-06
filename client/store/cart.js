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

const _addToCart = lineitem => ({
  type: ADD_TO_CART,
  lineitem
})

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

export const addToCart = (product, quantity, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        console.log("product", product);
        const lineitem = {
          quantity: 1,
          cost: product.price,
          productId: product.id,
        }
        const { data } = await axios.post('/api/cart', lineitem, 
          { headers: { authorization: token } }
        );
        dispatch(_addToCart(data));
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

const cart = (state = [], action) => {
  if (action.type === FETCH_CART) {
    return action.cart;
  }
  if (action.type === DELETE_FROM_CART) {
    const newState = [...state];
    newState[0].lineitems = state[0].lineitems.filter(lineitem => lineitem.id !== action.lineitem.id)
    return newState;
  }
  if (action.type === ADD_TO_CART) {
    console.log("Action", action)
    const newState = [...state];
    console.log("State", state);
    if (newState[0]) {
      newState[0].lineitems = [...state[0].lineitems, action.lineitem];
    } else {
      newState.push({lineitems: [action.lineitem]});
    }
    //newState[0].lineitems = [...state[0].lineitems, action.lineitem];
    //console.log("New State", newState);
    return newState;
  }
  return state;
};

export default cart;
