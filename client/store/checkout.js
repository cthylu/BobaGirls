import axios from "axios";

const CREATE_SHIPPING = "CREATE_SHIPPING";

const _createShipping = (information) => ({
  type: CREATE_SHIPPING,
  information,
});

export const createShipping = (name, history) => {
  return async (dispatch) => {
    const information = (await axios.post("/api/checkout", { name })).data;
    dispatch(_createShipping(information));
      history.push(`/orders`);
  };
};

const checkout = (state = [], action) => {
  if (action.type === CREATE_SHIPPING) {
    return [...state, action.information];
  }
  return state;
};

export default checkout;
