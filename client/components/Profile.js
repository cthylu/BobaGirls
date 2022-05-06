import React from "react";
import { connect } from "react-redux";
import auth from "../store/auth";
import users from "../store/users";

/**
 * COMPONENT
 */
export const Profile = (props) => {
  const { username, firstname, auth, ping } = props;
  return (
    <div>
      <div className="profile">
        <div> UserName: {username}
        {firstname}
        </div>
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
    firstname: state.auth.firstName,
  };
};

export default connect(mapState)(Profile);
