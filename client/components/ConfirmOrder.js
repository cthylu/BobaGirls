import React from "react";
import { connect } from "react-redux";
import { createOrder } from "../store";
import { Link } from "react-router-dom";

const newOrder = Math.round(Math.random() * 1000);
const Month = new Date().getMonth() + 1;
const Day = new Date().getDate();
const Year = new Date().getFullYear();
// const success = alert("Order Successfully Placed");

const Confirmation = ({ cart, createOrder }) => {
  return (
    <div>
      <div> Information Received. </div>
      <div>
        You have {cart.lineitems?.length} items in your
        <Link to={"/cart"}> Cart </Link>
      </div>
      {/* {console.log(user.id)} */}
      <div> Your total is $</div>
      <div>Please Submit your Order.</div>
      <div>
        {/* <button onClick={() => createOrder(items)}> */}
        <button onClick={() => createOrder(cart.id)}> Submit</button>
      </div>
    </div>
  );
};

const mapState = ({ cart }) => {
  return {
    cart,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createOrder: (id) => {
      dispatch(createOrder(id, history));
    },
  };
};

export default connect(mapState, mapDispatch)(Confirmation);
