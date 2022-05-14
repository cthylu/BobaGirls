import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import auth from "../store/auth";
import users from "../store/users";

/**
 * COMPONENT
 */
export const Profile = (props) => {
  const { username, users, auth, ping } = props;
  return (
    <div className="content profile flex-container">
      <div className="column column-left">
        <div className="profile2"> Profile Picture: <br/><img className='profilepic' src={auth.profilePicture} /> </div>
      </div>
      <div className="column column-right">
        <Link to='/editprofile'><div className="editprofile-btn">Edit Profile</div></Link>
        <div className="profile2"> Username: {auth.username} </div>
        <div className="profile2"> First Name: {auth.firstName} </div>
        <div className="profile2"> Last Name: {auth.lastName} </div>
        <div className="profile2"> E-mail Address: {auth.email} </div>
        <div className="profile2"> Credit Card: {auth.creditCard} </div>
        <div className="profile2"> Address: {auth.address} </div>
        <div className="profile2"> City: {auth.city} </div>
        <div className="profile2"> State: {auth.state} </div>
        <div className="profile2"> Zip Code: {auth.zipCode} </div>
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
