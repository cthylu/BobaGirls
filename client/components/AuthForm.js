import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, intro } = props;

  return (
    <div className="content">
      <div className="login-container">
        <form onSubmit={handleSubmit} name={name}>
          <div className="row">
            <h1>{intro}</h1>
          </div>

          <div className="row">
            <label htmlFor="username">Username</label>
            <input name="username" type="text" required placeholder="username" />
          </div>

          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="password"
            />
          </div>

          <div className="row">
            <div>
              <span>
                Don't have an account?
              </span>
            </div>
            <Link to="/signup">
              <div>Create Account</div>
            </Link>
          </div>
          
          <div className="row">
            <button className="loginb" type="submit">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    intro: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    intro: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
