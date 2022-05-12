import axios from "axios";
import history from "history";
import users from "./users";

const FETCH_CART = "FETCH_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CHECK_OUT_ORDER = "CHECK_OUT_ORDER";

const _fetchCart = (cart) => ({
  type: FETCH_CART,
  cart,
});

const _deleteFromCart = (lineitem) => ({
  type: DELETE_FROM_CART,
  lineitem,
});

const _addToCart = (lineitem) => ({
  type: ADD_TO_CART,
  lineitem,
});

const _checkOutOrder = (order) => ({
  type: CHECK_OUT_ORDER,
  order,
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

export const addToCart = (product, quantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        console.log("product", product);
        const lineitem = {
          quantity,
          cost: product.price,
          productId: product.id,
        };
        const { data } = await axios.post("/api/cart", lineitem, {
          headers: { authorization: token },
        });
        dispatch(_addToCart(data));
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const createOrder = (id, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const Month = new Date().getMonth() + 1;
      const Day = new Date().getDate();
      const Year = new Date().getFullYear();
      const newOrder = {
        time: `${Month}/${Day}/${Year}`,
        // orderNumber: Math.round(Math.random() * 1000),
        isCart: false,
      };
      console.log(newOrder);
      console.log(token);
      const { data } = (
        await axios.put(`/api/orders/${id}`, newOrder, {
          headers: {
            authorization: token,
          },
        })
      )
      console.log(data)
      dispatch(_checkOutOrder(data));
      history.push("/orders");
    } catch (e) {
      console.log({ e });
    }
  };
};

const cart = (state = { lineitems: [] }, action) => {
  if (action.type === FETCH_CART) {
    return action.cart;
  }
  if (action.type === DELETE_FROM_CART) {
    return {
      ...state,
      lineitems: state.lineitems.filter(
        (lineitem) => lineitem.id !== action.lineitem.id
      ),
    };
  }
  if (action.type === ADD_TO_CART) {
    return {
      ...state,
      lineitems: [...state.lineitems, action.lineitem],
    };
  }
  if (action.type === CHECK_OUT_ORDER) {
    // return
    // return {...state, cart: state.cart.filter((items) => items.id !== action.items.id) }
    return {lineitems: []};
  }
  return state;
};

export default cart;
