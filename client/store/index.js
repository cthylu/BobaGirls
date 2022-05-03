
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import products from './products'
import cart from './cart'
import singleProduct from './singleProduct'
import order from './order'
import singleOrder from './singleOrder'
import users from "./users";

const reducer = combineReducers({ auth, products, singleProduct, cart, order, singleOrder,users })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store
export * from './auth'
export * from './products'
export * from "./users";
export * from './cart'
export * from './singleProduct'
export * from './order'
export * from './singleOrder'

