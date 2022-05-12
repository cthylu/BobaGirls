import React from "react";
import { connect } from "react-redux";
import { createOrder } from "../store";
import { Link } from "react-router-dom";

const Confirmation = ({ cart, createOrder }) => {
  return (
    <div>
      <div> Information Received. </div>
      <div>
        You have {cart.lineitems.length} items in your
        <Link to={"/cart"}> Cart </Link>
      </div>
      <div> Your total is $</div>
      <div>Please Submit your Order.</div>
      <div>
        <button onClick={createOrder}> <Link to='/home'>Submit </Link> </button>
      </div>
    </div>
  );
};

const mapState = ({ cart }) => {
  return {
    cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createOrder: () => {dispatch(createOrder());
    },
  };
};

export default connect(mapState, mapDispatch)(Confirmation);
