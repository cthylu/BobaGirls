import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store'
import AllProducts from './components/AllProducts';
import { fetchProducts } from './store/products';
import Cart from './components/Cart';
import { fetchCart } from './store/cart';
import Product from './components/Product';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
    this.props.loadProducts();
    this.props.loadCart();
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <main>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path='/products' component={AllProducts} />
            <Route path='/products/:id' component={Product} />
            <Route path='/cart' component={Cart} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path='/products' component={AllProducts} />
            <Route path='/products/:id' component={Product} />
            <Route path='/cart' component={Cart} />
          </Switch>
        )}
      </main>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadProducts: () => dispatch(fetchProducts()),
    loadCart: () => dispatch(fetchCart())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
