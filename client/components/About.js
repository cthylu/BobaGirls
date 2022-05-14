import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const About = (props) => {
  const { username } = props;

  return (
    <div className="content">
      <div className="about">
        <h1 className="abouttitle">ABOUT BOBAGIRL</h1>
        <p className="aboutbody">
          BobaGirl is an online premium tea and bubble tea shop that was
          inspired by 'BobaGuys'! Boba Girl was founded by Cathy Lu, Ice Tam,
          Ying Ying Feng and Kimberly Wu in April 2022. They believe in sharing
          the tastiest teas with all their customers! All ingredients are
          internationally sourced from Taiwan to provide the healthiest
          ingredients. BobaGirl allows customers to build their own Boba Kit
          using different ingredients to suit their tastes!
        </p>
      </div>
      <div className="boba">
        <h1 className="bobatitle"> WHAT IS BOBA? </h1>
        <p className="aboutboba">
          Boba pearls are made of tapioca starch that comes from the cassava
          root, so compassionate customers can rest easy knowing that gelatin is
          not used in the making of these tiny balls of deliciousness.
        </p>
      </div>
      <div className="drink">
        <h1 className="drinktitle"> HOW CAN WE CUSTOMIZE OUR DRINKS?</h1>
        <p className="aboutdrink">
          You can customize your drinks in many different ways! First pick a
          base tea (green tea, passion fruit, etc.), there are many to choose
          from in our store! Then, choose a syrup (mango, honeydew, lychee,
          etc.) Next, pick toppings of your choice (tapioca pearls, lychee
          jelly, etc.) Finally, get a cute tumbler to make your boba drink in!
          Follow the directions and enjoy your yummy drink!
        </p>
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

export default connect(mapState)(About);
