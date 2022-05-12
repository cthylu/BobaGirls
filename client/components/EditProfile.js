import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../store";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user ? this.props.user.username : "",
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
  componentDidUpdate(prevProps){
    if(!prevProps.user && this.props.user){
      this.setState({
        username: this.props.user.username ,
        firstName: this.props.user.firstName ,
        lastName: this.props.user.lastName ,
        email: this.props.user.email ,
        creditCard: this.props.user.creditCard ,
        address: this.props.user.address ,
        city: this.props.user.city ,
        state: this.props.user.state ,
        zipCode: this.props.user.zipCode ,
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.updateUser({ ...this.props.user, ...this.state });
    alert ("Profile successfully updated!");
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
    const { username, firstName, lastName, email, creditCard, address, city, state, zipCode } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div>
                  
                  <form
                  
                    id="checkout"
                    name="checkout"
                    className="checkout"
                    onSubmit={onSubmit}
                  >
                      <div> Edit User Information! </div>
                    <label htmlFor="username"> Username: </label>
                    <input
                      name="username"
                      onChange={onChange}
                      value={username}
                      placeholder="Username"
                    />
                    <br />
                    <label htmlFor="firstName"> First Name: </label>
                    <input
                      name="firstName"
                      onChange={onChange}
                      value={firstName}
                      placeholder="First Name"
                    />
                    <br />
                    <label htmlFor="lastName"> Last Name: </label>
                    <input
                      name="lastName"
                      onChange={onChange}
                      value={lastName}
                      placeholder="Last Name"
                    />
                    <br />
                    <label htmlFor="email"> Email: </label>
                    <input
                      type="email"
                      name="email"
                      onChange={onChange}
                      value={email}
                      placeholder="E-mail"
                    />
                    <br />
                    <label htmlFor="creditCard"> Credit Card: </label>
                    <input
                      name="creditCard"
                      onChange={onChange}
                      value={creditCard}
                      placeholder="Credit Card Number"
                    />
                    <br />
                    <label htmlFor="address"> Address: </label>
                    <input
                      name="address"
                      onChange={onChange}
                      value={address}
                      placeholder="Address"
                    />
                    <br />
                    <label htmlFor="city"> City: </label>
                    <input
                      name="city"
                      onChange={onChange}
                      value={city}
                      placeholder="City"
                    />
                    <br />
                    <label htmlFor="state"> State: </label>
                    <input
                      name="state"
                      onChange={onChange}
                      value={state}
                      placeholder="State"
                    />
                    <br />
                    <label htmlFor="zipCode"> Zip-code: </label>
                    <input
                      name="zipCode"
                      onChange={onChange}
                      value={zipCode}
                      placeholder="Zip-code"

                    />
                    <br />
                    <button type="submit"> Update Information! </button>
                  </form>
                </div>
    )
  }
}

const mapState = ({cart, auth}) => {
  const user = auth
  return {
    user,
    cart
  }
};

const mapDispatch = (dispatch, {history}) => ({
  updateUser: (user) => dispatch(updateUser(user, history)),
});

export default connect(mapState, mapDispatch)(EditProfile);
