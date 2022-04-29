import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me, fetchTeas, fetchCart, fetchProducts } from './store'
import Teas from './components/Teas';
import Cart from './components/Cart';
import Tea from './components/Tea';
import Products from './components/Products';
import Product from'./components/Product';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
    this.props.loadTeas();
    this.props.loadProducts();
    this.props.loadCart()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <main>
        {isLoggedIn ? (
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/teas' component={Teas} />
            <Route path='/tea/:id' component={Tea} />
            <Route path='/cart' component={Cart} />
            <Route path='/products' component={Products} />
            <Route path='/product/:id' component={Product} />
            <Redirect to='/home' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/teas' component={Teas} />
            <Route path='/tea/:id' component={Tea} />
            <Route path='/products' component={Products} />
            <Route path='/product/:id' component={Product} />
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
  //console.log('state', state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    teas: state.teas,
    products: state.productsReducer
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadTeas: () => dispatch(fetchTeas()),
    loadCart: () => dispatch(fetchCart()),
    loadProducts: () => dispatch(fetchProducts())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
