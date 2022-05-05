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
    //   history.push(`/orders`);
  };
};
