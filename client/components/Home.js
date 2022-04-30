import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <div className="content">
        <h3>Welcome, {username}</h3>
      </div>

      <div className="hero">
        <div className="content">
          <div>
            <h1>TRY OUR TEAS TODAY</h1>
            <p>You know you want to!</p>
          </div>
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
  };
};

export default connect(mapState)(Home);
