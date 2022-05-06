import React from "react";
import { connect } from "react-redux";
import auth from "../store/auth";
import users from "../store/users";

/**
 * COMPONENT
 */
export const Profile = (props) => {
  const { username, users, auth, ping } = props;
  return (
    <div>
      <div className="profile">
        <div> Profile Picture: <img className='profilepic' src={auth.profilePicture} /> </div>
        <div> Username: {auth.username} </div>
        <div> First Name: {auth.firstName} </div>
        <div> Last Name: {auth.lastName} </div>
        <div> E-mail Address: {auth.email} </div>
        <div> Credit Card: {auth.creditCard} </div>
        <div> Address: {auth.address} </div>
        <div> City: {auth.city} </div>
        <div> State: {auth.state} </div>
        <div> Zip Code: {auth.zipCode} </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    auth: state.auth,
  };
};

export default connect(mapState)(Profile);
