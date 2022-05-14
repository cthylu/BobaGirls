import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, products, lineitems, cart, user }) => (
  <div className="navbar">
    <nav>
      {isLoggedIn ? (
        <div className="nav-flex">
          {/* The navbar will show these links after you log in */}
          <div className='nav-first'>
            <ul className='nav-top-level'>
              <li><Link to="/home"> Home </Link></li>
              <li>Shop
                <ul className='nav-dropdown'>
                  <li><Link to='/products'> All Products </Link></li>
                  <li><Link to='/products/kits'>DIY Kit</Link></li>
                  <li><Link to='/products/teas'> Teas </Link></li>
                  <li><Link to='/products/toppings'> Toppings </Link></li>
                  <li><Link to='/products/syrups'> Syrups </Link></li>
                  <li><Link to='/products/milkpowder'> Milk Powder</Link></li>
                  <li><Link to='/products/merchandise'> Merchandise </Link></li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/home"> <img src="/images/logo-boba-girl.svg"/> </Link>        
          <div>
            <ul className='nav-top-level'>
              <li><Link to='/profile'> Profile </Link></li>
              <li><Link to='/orders'>Orders</Link></li>
              <li><Link to="/cart">Cart ({user.id === cart.userId ? lineitems : 0})</Link></li>
              <li><a href="#" onClick={handleClick}>
                Logout
              </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="nav-flex">
          {/* The navbar will show these links before you log in */}
          <div className='nav-first'>
            <ul className='nav-top-level'>
              <li><Link to="/home"> Home </Link></li>
              <li>Shop
                <ul className='nav-dropdown'>
                  <li><Link to='/products'> All Products </Link></li>
                  <li><Link to='/products/kits'>DIY Kit</Link></li>
                  <li><Link to='/products/teas'> Teas </Link></li>
                  <li><Link to='/products/syrups'> Syrups </Link></li>
                  <li><Link to='/products/toppings'> Toppings </Link></li>
                  <li><Link to='/products/milkpowder'> Milk Powder</Link></li>
                  <li><Link to='/products/merchandise'> Merchandise </Link></li>
                </ul>
              </li>
              <li><Link to='/about'>About</Link></li>
            </ul>
          </div>
          <Link to="/home"> <img src="/images/logo-boba-girl.svg"/> </Link>
          <div>
            <ul className='nav-top-level'>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/cart">Cart ({user.id === cart.userId ? lineitems : 0})</Link></li>
            </ul>
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
  const cart = state.cart
  console.log(state.cart, 'CARTTTT')
  return {
    isLoggedIn: !!state.auth.id,
    products: state.products,
    user: state.auth,
    cart: state.cart,
    lineitems: cart.lineitems ? 
      cart.lineitems?.reduce((acc, line) => {
        return acc += line.quantity;
    }, 0) 
    : 0

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
