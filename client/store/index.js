import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
// import teaReducer from './tea'

const FETCH_ALL_TEAS = 'FETCH_ALL_TEAS';

const _fetchAllTeas = teas => ({ type: FETCH_ALL_TEAS, teas })

export const fetchAllTeas = () => async dispatch => {
    const teas = (await axios.get('/api/teas')).data
    console.log('hello')
    return dispatch(_fetchAllTeas(teas))
}

const teaReducer = function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_TEAS:
            return action.teas
        default:
            return state
    }
}

const reducer = combineReducers({ auth, teaReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
// export * from './tea'
