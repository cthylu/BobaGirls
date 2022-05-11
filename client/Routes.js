// library
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
// component
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Cart from './components/Cart';
import Products from './components/Products';
import Product from'./components/Product';
import About from './components/About';
import Orders from './components/Orders';
import Order from './components/Order';
import CheckOut from './components/CheckOut';
import Profile from './components/Profile';
//products
import Merchandise from './components/allProducts/Merchandise';
import MilkPowders from './components/allProducts/MilkPowders';
import Syrups from './components/allProducts/Syrups';
import Teas from './components/allProducts/Teas';
import Toppings from './components/allProducts/Toppings';
import NewProduct from './components/NewProduct';
import Kits from './components/Kits';

// store
import { me, fetchCart, fetchProducts, fetchUsers, fetchOrders, addToCart } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
  }
  
  addProductToCart(product) {
    console.log("Add product to cart")
    const quantity = 1;
    this.props.addToCart(product, quantity);
  }

  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadProducts();
    this.props.loadCart();
    this.props.loadOrders();
  }
  componentDidUpdate(){
    // STANNIE:: switch to socketio, its easier
    this.props.loadUsers();
    const url = window.location.origin;
    console.log(url);
    window.socket = new WebSocket(url.replace('http', 'ws'));
    window.socket.addEventListener('message', () => { 
      window.socket.send(JSON.stringify(window.localStorage.getItem('token')));
    });
    window.socket.addEventListener('message', ()=> {
      const message = JSON.parge(e.data);
      if (message.to){
        const action = {type: 'NEW_MESSAGE', message};
        this.props.dispatchAction(action);
      }
    })
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <main>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route exact path="/products/milkpowder" render={({match, history}) => <MilkPowders match={match} history={history} addProductToCart={this.addProductToCart} />} />
            <Route exact path="/products/syrups" component={Syrups} />
            <Route exact path="/products/teas" component={Teas} />
            <Route exact path="/products/toppings" component={Toppings} />
            <Route exact path="/products/merchandise" component={Merchandise} />
            <Route path="/products" exact render={ 
              ({match, history}) => <Products match={match} history={history} addProductToCart={this.addProductToCart} /> } />
            <Route path="/products/:id" component={Product} />
            <Route path='/kits' component={Kits} />

            <Route path="/about" component={About} />            
            <Route path='/orders' component={Orders} />
            <Route path='/order/:id' component={Order} />
            <Route path='/checkout' component={CheckOut} />
            <Route path='/profile' component={Profile} />
            <Route path='/newproducts' component={NewProduct} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" component={About} />

            <Route exact path="/products/milkpowder" component={MilkPowders} />
            <Route exact path="/products/syrups" component={Syrups} />
            <Route exact path="/products/teas" component={Teas} />
            <Route exact path="/products/toppings" component={Toppings} />
            <Route exact path="/products/merchandise" component={Merchandise} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" component={Product} />
            <Route path='/kits' component={Kits} />

            <Route path="/cart" component={Cart} />
            <Route path="/about" component={About} />
          </Switch>
        )}
      </main>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  //console.log('state', state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    products: state.productsReducer,
    orders: state.ordersReducer
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadCart: () => dispatch(fetchCart()),
    loadProducts: () => dispatch(fetchProducts()),
    loadUsers: () => dispatch(fetchUsers()),
    loadOrders: () => dispatch(fetchOrders()),
    dispatchAction: (action) => dispatch(action),
    addToCart: (product, quantity) =>
      dispatch(addToCart(product, quantity)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
