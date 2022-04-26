import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import Teas from './components/Teas';
import { fetchTeas } from './store/teas';
import Cart from './components/Cart';
import { fetchCart } from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
    this.props.loadTeas();
    this.props.loadCart();
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <main>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path='/teas' component={Teas} />
            <Route path='/cart' component={Cart} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path='/teas' component={Teas} />
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
    loadTeas: () => dispatch(fetchTeas()),
    loadCart: () => dispatch(fetchCart())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
