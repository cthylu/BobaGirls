
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me, fetchCart, fetchProducts, fetchUsers } from './store'
import Cart from './components/Cart';
import Products from './components/Products';
import Product from'./components/Product';
import About from './components/About';
import Orders from './components/Orders';
import Order from './components/Order';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadProducts();
    this.props.loadCart();    
  }
  componentDidUpdate(){
    this.props.loadUsers();
    const url = window.location.origin;
    console.log(url);
    window.socket = new WebSocket(url.replace('http', 'ws'));
    window.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.to === this.props.auth.id ){
        return ('hi')
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
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" component={Product} />     
            <Route path="/about" component={About} />            
            <Route path='/orders' component={Orders} />
            <Route path='/order/:id' component={Order} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" component={About} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" component={Product} />
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
    loadUsers: () => dispatch(fetchUsers())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
