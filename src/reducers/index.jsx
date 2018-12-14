import { combineReducers } from 'redux'             
import { categoriesReducer }  from './categories'
import { userReducer } from './user'



export default combineReducers({ userReducer, categoriesReducer })