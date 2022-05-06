import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";

const Navbar = ({ handleClick, isLoggedIn, products, lineitems, cart }) => {
  const [open, setOpen] = useState(false);
  const toggleBurg = () => {
    setOpen(!open);
  };
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (e) {
    if (!e.target.matches(".dropbtn")) {
      var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }
  };
  return (
    <div className="navbar">

      {/* <div className="navbar2">
        <a><Link to="/home">
              <img src="/images/logo-boba-girl.svg" />
            </Link></a>
        <a href="#news">News</a>
        <div className="dropdown">
          <button className="dropbtn" onClick={() =>myFunction()}>
            Dropdown
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content" id="myDropdown">
            <a><Link to="/cart">Cart</Link></a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </div> */}

      <nav>
        {isLoggedIn ? (
          <div className="nav-flex">
            {/* The navbar will show these links after you log in */}
            <div>
              <Link to="/home"> Home </Link>
              <Link to="/products"> Shop ({products.length}) </Link>
            </div>
            <Link to="/home">
              <img src="/images/logo-boba-girl.svg" />
            </Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile"> Profile </Link>
            <Link to="/orders">Orders</Link>
            <Link to="/checkout"> Check Out </Link>
            <a href="#" onClick={handleClick}>   
              Logout
            </a>
          </div>
        ) : (
          <div className="nav-flex">
            {/* The navbar will show these links before you log in */}
            <div>
              <Link to="/home">Home</Link>
              <Link to="/products">Products ({products.length})</Link>
              <Link to="/about"> About</Link>
            </div>
            <Link to="/home">
              <img src="/images/logo-boba-girl.svg" />
            </Link>
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart"> Cart</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

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
