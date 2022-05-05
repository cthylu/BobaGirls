import React from "react";
import { connect } from "react-redux";
import auth from "../store/auth";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, users } = props;

  const sendPing = (user) => {
    console.log(user);
    const message = { from: auth.id, to: user.id };
    window.socket.send(JSON.stringify(message));
    console.log(message);
  };
  
  return (
    <div>
      <div className="content">
        <h3 className='welcome'>Welcome {username}!</h3>
        {/* <h3> {username} ? <div>Welcome {username} </div> : <div>{''}</div></h3> */}
      </div>
      {/* <ul>
        {users.map((user) => {
          return (
            <li key={user.id} onClick={() => sendPing()}>
              {user.username}
            </li>
          );
        })}
      </ul> */}
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
    users: state.users,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
