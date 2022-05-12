import axios from "axios";
import history from "history";

const FETCH_CART = "FETCH_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CHECK_OUT_ORDER = 'CHECK_OUT_ORDER';

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

const _checkOutOrder = (products) => ({
  type: CHECK_OUT_ORDER,
  products
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

export const createOrder = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      const newOrder = {
        time: new Date(),
        orderNumber: Math.random()
      }
      const order = ((await axios.post( "/api/orders", { }, {
            headers: {
              authorization: token,
            },
          }
        )
      ).data)
      dispatch(_fetchCart(order));
    } catch (e) {
      next(e);ß
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
  // if (action.type === CHECK_OUT_ORDER){
  //   return state = { lineitems: []}
  // }
  return state;
};

export default cart;
