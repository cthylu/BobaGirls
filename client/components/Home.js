import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, users, auth, ping } = props;

  const sendPing = (user) => {
    console.log(user);
    const message = { from: auth.id, to: user.id };
    window.socket.send(JSON.stringify(message));
    console.log(message);
  };

  return (
    <div className="homepage">
      <div className="hero">
        <div className="hero-text">
          <h1>Start Making Boba Tea at Home</h1>
          <Link to="/products">
            <button className="shopnow">SHOP NOW</button>
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="row quote">
          <h2>Introducing BobaGirl Teas</h2>
          <p>
            We provide all the parts you need for the perfect boba tea at home!
            From our premium tea selection, to toppings, to premade kits, you
            can customize and select ingredients for your special custom tea.
          </p>
          <q>'Best bubble tea I've ever had!' - Everyone</q>
        </div>
      </div>
      <div className="row flex-container product-boxes">
        <div className="column column-left">
          <Link to="/products/teas">
            <div className="bg-layer">
              <h2>Premium Teas</h2>
            </div>
          </Link>
        </div>
        <div className="column column-right">
          <Link to="/products/kits">
            <div className="bg-layer">
              <h2>Try Our DIY Kits</h2>
            </div>
          </Link>
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
    users: state.users,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
