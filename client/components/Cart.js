import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      lineitems: this.props.cart ? this.props.cart.lineitems : [],
      // id: this.props.carts ? this.props.carts.id : '',
      // totalCost: this.props.carts ? this.props.carts.totalCost : '',
      // isCart: this.props.carts ? this.props.carts.isCart : '',
      // userId: this.props.carts ? this.props.carts.userId : '',
      // listitems: this.props.carts ? this.props.carts.listitems : [],
    };
  }
  async componentDidMount() {
    const token = window.localStorage.getItem("token");
    const cart = (
      await axios.get("/api/cart", {
        headers: {
          authorization: token,
        },
      })
    ).data;
    this.setState({ cart });
    // this.setState({
    //   id: this.props.carts.id,
    //   totalCost: this.props.carts.totalCost,
    //   isCart: this.props.carts.isCart,
    //   userId: this.props.carts.userId,
    //   listitems: this.props.carts.listitems,
    // })
  }
  render() {
    // const { id, totalCost, isCart, userId, lineitems} = this.state;
    const { cart, lineitems } = this.state;
    // const lineitems = cart.lineitem.map(el => el)
    console.log(typeof(cart));
    console.log('cart:',(cart));
    console.log('cart through lineitems',(cart.lineitems));
    console.log('lineitems',(lineitems));
    // console.log(lineitems)
    return (
    <div>
      {/* id: {cart.id} <br /> */}
      {/* totalCost: {totalCost} <br /> */}
      {/* isCart: {JSON.stringify(isCart)} <br /> */}
      userId: {cart.userId} <br /> 
      lineitems: {lineitems}
      {/* {cart.lineitems}
      {/* <ul>
      {Object.values(cart).map(({cart}, i) => {
      return (
    <div >
     <p>{cart}</p>
    {cart.map(el=> (<p>{el}</p>))}
  </div> )})}
        </ul> */}
      </div>);
  }
}


// const mapStateToProps = ({ cart }, { match }) => { 
//   const carts = cart.find(userId => lineitems.id === match.params.id*1);
//   return {
//     carts
//   };
// };
// 

const mapStateToProps = (state) => ( state );

export default connect(mapStateToProps)(Cart);
