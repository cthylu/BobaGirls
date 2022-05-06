import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { createShipping } from "../store/checkout";
import { Link } from "react-router-dom";

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
  async componentDidMount() {
    this.props.fetchCart();
  }
  checkout(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
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
    const { cart } = this.props;
    const { checkout, handleSubmit } = this;
    return (
      <div>
        {cart.map((item) => {
          return (
            <div key={item.id}>
              {console.log(item)}
              {item.isCart === true && item.lineitems.length > 0 ? (
                <div>
                  You have {item.lineitems.length} items in your
                  <Link to={"/cart"}> Cart </Link>
                  <div> Your total is $</div>
                  <div> To continue checking out, fill out the below. </div>
                  <form
                    id="checkout"
                    className="checkout"
                    onSubmit={handleSubmit}
                  >
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
                      type="email"
                      name="email"
                      onChange={checkout}
                      value={email}
                      placeholder="E-mail"
                      required
                    />
                    <br />
                    <label htmlFor="address"> Address*: </label>
                    <input
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
                      placeholder="Zip-code"
                      required
                    />
                    <br />
                    <button type="submit"> Complete Purchase </button>
                  </form>
                </div>
              ) : (
                <div>
                  No items in your <Link to={"/cart"}> Cart </Link>! Try some of our
                  <Link to={"/products"}> Products! </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = (dispatch, { history }) => ({
  fetchCart: (userId) => dispatch(fetchCart(userId)),
  createShipping: (information) =>
    dispatch(createShipping(information, history)),
});

export default connect(mapState, mapDispatch)(CheckOut);
