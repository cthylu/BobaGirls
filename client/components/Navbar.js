import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, products }) => (
  <div className="navbar">
    <nav>
      {isLoggedIn ? (
        <div className="nav-flex">
          {/* The navbar will show these links after you log in */}
          <div>
            <Link to="/home">Home</Link>
            <Link to="/products">Shop ({products.length})</Link>
          </div>
          <img src="/images/logo-boba-girl.svg" />
          <div>
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="nav-flex">
          {/* The navbar will show these links before you log in */}
          <div>
            <Link to="/home">Home</Link>
            <Link to="/products">Products ({products.length})</Link>
            <Link to="/about"> About</Link>
          </div>
          <img src="/images/logo-boba-girl.svg" />
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
