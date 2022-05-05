import React from "react";
import { connect } from "react-redux";
import users from "../store/users";

class CheckOut extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      checkout: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    };
    this.checkout = this.checkout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  checkout(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventdefault();
    this.props.createShipping({ ...this.state });
    this.setState(
      (this.state = {
        firstname: "",
        lastname: "",
        checkout: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
      })
    );
  }
  render() {
    const { firstname, lastname, email, address, city, state, zipcode } =
      this.state;
    const { checkout, handleSubmit } = this;
    return (
      <div>
        {/* this part would contain everything on cart page with price */}
        <form id="checkout" className="checkout" onSubmit={handleSubmit}>
          <label htmlFor="firstname"> First Name*: </label>
          <input
            name="firstname"
            onChange={checkout}
            value={firstname}
            placeholder="First Name"
            required
          />
          <br />
          <label htmlFor="lastname"> Last Name*: </label>
          <input
            name="lastname"
            onChange={checkout}
            value={lastname}
            placeholder="Last Name"
            required
          />
          <br />
          <label htmlFor="email"> Email*: </label>
          <input
            name="email"
            onChange={checkout}
            value={email}
            placeholder="E-mail"
            required
          />
          <br />
          <label htmlFor="address"> Address*: </label>
          <input
            type="email"
            name="address"
            onChange={checkout}
            value={address}
            placeholder="Address"
            required
          />
          <br />
          <label htmlFor="city"> City*: </label>
          <input
            name="city"
            onChange={checkout}
            value={city}
            placeholder="City"
            required
          />
          <br />
          <label htmlFor="state"> State*: </label>
          <input
            name="state"
            onChange={checkout}
            value={state}
            placeholder="State"
            required
          />
          <br />
          <label htmlFor="zipcode"> Zip-code*: </label>
          <input
            name="zipcode"
            onChange={checkout}
            value={zipcode}
            placeholder="Zipcode"
            required
          />
          <br />
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}

// const mapState = (state) => (state);

const mapDispatch = (dispatch, { history }) => ({
  createShipping: (information) =>
    dispatch(createShipping(information, history)),
});

export default connect(null, mapDispatch)(CheckOut);
