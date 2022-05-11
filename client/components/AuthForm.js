import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, intro} = props;

  return (
    <div className='signup1'>
      <form onSubmit={handleSubmit} name={name}>  
        <div>     
          <h3 className='signup'> {intro} </h3>
          <br/>
          <label htmlFor="username">
            <small className="label1">USERNAME</small>
          </label>
          <input name="username" type="text" required placeholder="username"/>
        </div>
        <br />
        <div>
          <label htmlFor="password">
            <small className="label1">PASSWORD</small>
          </label>
          <input name="password" type="password" required placeholder="password" />
        </div>
        <br />
        <Link to='/signup' >
        <div>Create Account</div>
        </Link>
        <br />
        <div>
          <button className='loginb' type="submit">{displayName}</button>
        </div>
        <br/>
        {error && error.response && <div > {error.response.data} </div>}
      </form>
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
    intro: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    intro: 'Sign Up',
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
