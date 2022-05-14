import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content flex-container">
        <div className="column-left">
          <h3>Find Us on Social Media</h3>
          <div className="flex-container">
            <img src="/images/Instagram-Icon.png" />
            <img src="/images/Facebook-Icon.png" />
            <img src="/images/Twitter-Icon.png" />
          </div>
        </div>
        <div className="column-right">
          <h2>Boba Girls</h2>
          <p>A premium tea and bubble tea shop founded by:
            <ul>
              <li>Ying Ying Feng</li>
              <li>Cathy Lu</li>
              <li>Ice Tam</li>
              <li>Kimberly Wu</li>
            </ul>
          </p>
          <p><small>© 2022 BobaGirls Company</small></p>
        </div>
      </div>
    </div>
  )
}

export default connect(state => state)(Footer);