import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateOrder } from "../store";

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user ? this.props.user.firstName : "",
      lastName: this.props.user ? this.props.user.lastName : "",
      email: this.props.user ? this.props.user.email : "",
      creditCard: this.props.user ? this.props.user.creditCard : "",
      address: this.props.user ? this.props.user.address : "",
      city: this.props.user ? this.props.user.city : "",
      state: this.props.user ? this.props.user.state : "",
      zipCode: this.props.user ? this.props.user.zipCode : "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        creditCard: this.props.user.creditCard,
        address: this.props.user.address,
        city: this.props.user.city,
        state: this.props.user.state,
        zipCode: this.props.user.zipCode,
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.updateOrder({ ...this.props.user, ...this.state });
    alert("Order Successfully Placed!");
    // this.setState(
    //   (this.state = {
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     creditCard: "",
    //     address: "",
    //     city: "",
    //     state: "",
    //     zipCode: "",
    //   })
    // )
    // ;
    // }
    // alertSuccess() {
    //   if (document.forms.checkout.name.value === ""){
    //     alert("Please fill out all fields!");
    //     return false;
    //   } else {
    //   alert ("Order Successfully Placed!")
    //   return true;
    // };
  }
  render() {
    const { firstName, lastName, email, creditCard, address, city, state, zipCode } = this.state;
    const { cart } = this.props;
    const { onChange, onSubmit } = this;
    return (
      <div>
        {cart.length !== 0 ? (
          <div>
            {/* {console.log('user here', users)}
              {console.log('user here', cart)}
              {console.log('user here', username)} */}
            {cart.isCart === true && cart.lineitems.length > 0 ? (
              <div>
                {/* {console.log('inside in here')} */}

                <form
                  id="checkout"
                  name="checkout"
                  className="checkout"
                  onSubmit={onSubmit}
                >
                  <div> You have {cart.lineitems.length} items in your <Link to={"/cart"}> Cart </Link> </div>
                  <div> Your total is $</div>
                  <div> To continue checking out, fill out the below. </div>
                  <div> Shipping Information </div>
                  <label htmlFor="firstName"> First Name*: </label>
                  <input
                    name="firstName"
                    onChange={onChange}
                    value={firstName}
                    placeholder="First Name"
                    required
                  />
                  <br />
                  <label htmlFor="lastName"> Last Name*: </label>
                  <input
                    name="lastName"
                    onChange={onChange}
                    value={lastName}
                    placeholder="Last Name"
                    required
                  />
                  <br />
                  <label htmlFor="email"> Email*: </label>
                  <input
                    type="email"
                    name="email"
                    onChange={onChange}
                    value={email}
                    placeholder="E-mail"
                    required
                  />
                  <br />
                  <label htmlFor="creditCard"> Credit Card*: </label>
                  <input
                    name="creditCard"
                    onChange={onChange}
                    value={creditCard}
                    placeholder="Credit Card Number"
                    required
                  />
                  <br />
                  <label htmlFor="address"> Address*: </label>
                  <input
                    name="address"
                    onChange={onChange}
                    value={address}
                    placeholder="Address"
                    required
                  />
                  <br />
                  <label htmlFor="city"> City*: </label>
                  <input
                    name="city"
                    onChange={onChange}
                    value={city}
                    placeholder="City"
                    required
                  />
                  <br />
                  <label htmlFor="state"> State*: </label>
                  <input
                    name="state"
                    onChange={onChange}
                    value={state}
                    placeholder="State"
                    required
                  />
                  <br />
                  <label htmlFor="zipCode"> Zip-code*: </label>
                  <input
                    name="zipCode"
                    onChange={onChange}
                    value={zipCode}
                    placeholder="Zip-code"
                    required
                  />
                  <br />
                  <button type="submit"> Complete Purchase </button>
                </form>
              </div>
            ) : (
              <div>
                {/* {console.log('in here')} */}
                No items in your <Link to={"/cart"}> Cart </Link>! Try some of
                our <Link to={"/products"}> Products! </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* {console.log('no out here')} */}
            No items in your <Link to={"/cart"}> Cart </Link>! Try some of our{" "}
            <Link to={"/products"}> Products! </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapState = ({ cart, auth }) => {
  const user = auth;
  return {
    user,
    cart,
  };
};

const mapDispatch = (dispatch, { history }) => ({
  updateOrder: (user) => dispatch(updateOrder(user, history)),
});

export default connect(mapState, mapDispatch)(CheckOut);
