import axios from "axios";

const FETCH_ONE_PRODUCT = "FETCH_ONE_PRODUCT";

const _fetchSingleProduct = (product) => {
  return {
    type: FETCH_ONE_PRODUCT,
    product,
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_fetchSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
