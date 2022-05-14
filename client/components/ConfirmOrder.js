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
  const success = () => {
    alert("Your order has been placed. Thank you!");
  };

  function getCartTotal() {
    const lineitems = cart.lineitems;
    const ProductTotal =
      lineitems &&
      lineitems.reduce((acc, item) => {
        acc += item.quantity * item.product?.price;
        return acc;
      }, 0);
    const tax = Math.round(ProductTotal * 0.0875 * 100) / 100;
    return (ProductTotal * tax * 1).toFixed(2);
  }

  function getCartTotalItems() {
    const lineitems = cart.lineitems;
    const ProductTotalItems =
      lineitems &&
      lineitems.reduce((acc, item) => {
        acc += item.quantity;
        return acc;
      }, 0);
    return ProductTotalItems.toFixed(0);
  }
  return (
    <div className="checkout">
      <div> Shipping Information Received. </div>
      <div>
        You have {getCartTotalItems()} items in your
        <Link to={"/cart"}> Cart </Link>
      </div>
      {/* {console.log(user.id)} */}
      <div> Your total is ${getCartTotal()}</div>
      <div>Please Confirm your Order.</div>
      <div>
        {/* <button onClick={() => createOrder(items)}> */}
        <button className='addtocart-btn' id='submit' onClick={() => createOrder(cart.id, success())}>
          Confirm
        </button>
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
