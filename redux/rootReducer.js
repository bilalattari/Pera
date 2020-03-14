/* eslint-disable */

import { combineReducers }  from 'redux'

import auth from './reducers/authReducer'
import chart from './reducers/chartReducer'

export default combineReducers({
    auth,
    chart
})
